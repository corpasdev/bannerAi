import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  addDoc,
  writeBatch,
  onSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore';
import type { DocumentData, WhereFilterOp, OrderByDirection } from 'firebase/firestore';
import { db } from './init';

// Types
export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface QueryOptions {
  orderBy?: {
    field: string;
    direction?: OrderByDirection;
  };
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
  filters?: Array<{
    field: string;
    operator: WhereFilterOp;
    value: any;
  }>;
}

export interface PaginationResult<T> {
  documents: T[];
  hasMore: boolean;
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}

// Helper functions
const addTimestamps = (data: any): any => {
  const now = Timestamp.now();
  return {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
};

const updateTimestamp = (data: any): any => {
  return {
    ...data,
    updatedAt: Timestamp.now(),
  };
};

const convertDocumentData = <T>(doc: QueryDocumentSnapshot<DocumentData>): T & BaseDocument => {
  return {
    id: doc.id,
    ...doc.data(),
  } as T & BaseDocument;
};

// Document operations
export const createDocument = async <T>(
  collectionName: string,
  data: T,
  docId?: string
): Promise<string> => {
  try {
    const dataWithTimestamps = addTimestamps(data);
    
    if (docId) {
      await setDoc(doc(db, collectionName, docId), dataWithTimestamps);
      return docId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), dataWithTimestamps);
      return docRef.id;
    }
  } catch (error) {
    throw new Error(`Failed to create document: ${error}`);
  }
};

export const getDocument = async <T>(
  collectionName: string,
  docId: string
): Promise<(T & BaseDocument) | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T & BaseDocument;
    }

    return null;
  } catch (error) {
    throw new Error(`Failed to get document: ${error}`);
  }
};

export const updateDocument = async <T>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const dataWithTimestamp = updateTimestamp(data);
    await updateDoc(docRef, dataWithTimestamp);
  } catch (error) {
    throw new Error(`Failed to update document: ${error}`);
  }
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Failed to delete document: ${error}`);
  }
};

// Collection operations
export const getDocuments = async <T>(
  collectionName: string,
  options?: QueryOptions
): Promise<(T & BaseDocument)[]> => {
  try {
    let q = query(collection(db, collectionName));

    if (options?.filters) {
      options.filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }

    if (options?.orderBy) {
      q = query(q, orderBy(options.orderBy.field, options.orderBy.direction));
    }

    if (options?.limit) {
      q = query(q, limit(options.limit));
    }

    if (options?.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocumentData<T>(doc));
  } catch (error) {
    throw new Error(`Failed to get documents: ${error}`);
  }
};

export const getDocumentsPaginated = async <T>(
  collectionName: string,
  pageSize: number,
  options?: Omit<QueryOptions, 'limit'>
): Promise<PaginationResult<T & BaseDocument>> => {
  try {
    let q = query(collection(db, collectionName));

    if (options?.filters) {
      options.filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }

    if (options?.orderBy) {
      q = query(q, orderBy(options.orderBy.field, options.orderBy.direction));
    }

    if (options?.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }

    q = query(q, limit(pageSize + 1)); // Get one extra to check if there are more

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const documents = docs.slice(0, pageSize).map(doc => convertDocumentData<T>(doc));
    const lastDoc = hasMore ? docs[pageSize - 1] : null;

    return {
      documents,
      hasMore,
      lastDoc,
    };
  } catch (error) {
    throw new Error(`Failed to get paginated documents: ${error}`);
  }
};

// Batch operations
export const batchWrite = async (operations: Array<{
  type: 'create' | 'update' | 'delete';
  collectionName: string;
  docId?: string;
  data?: any;
}>): Promise<void> => {
  try {
    const batch = writeBatch(db);

    operations.forEach(operation => {
      const docRef = operation.docId 
        ? doc(db, operation.collectionName, operation.docId)
        : doc(collection(db, operation.collectionName));

      switch (operation.type) {
        case 'create':
          batch.set(docRef, addTimestamps(operation.data));
          break;
        case 'update':
          batch.update(docRef, updateTimestamp(operation.data));
          break;
        case 'delete':
          batch.delete(docRef);
          break;
      }
    });

    await batch.commit();
  } catch (error) {
    throw new Error(`Failed to execute batch write: ${error}`);
  }
};

// Real-time subscriptions
export const subscribeToDocument = <T>(
  collectionName: string,
  docId: string,
  callback: (doc: (T & BaseDocument) | null) => void
): (() => void) => {
  const docRef = doc(db, collectionName, docId);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({
        id: doc.id,
        ...doc.data(),
      } as T & BaseDocument);
    } else {
      callback(null);
    }
  });
};

export const subscribeToCollection = <T>(
  collectionName: string,
  callback: (docs: (T & BaseDocument)[]) => void,
  options?: QueryOptions
): (() => void) => {
  let q = query(collection(db, collectionName));

  if (options?.filters) {
    options.filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });
  }

  if (options?.orderBy) {
    q = query(q, orderBy(options.orderBy.field, options.orderBy.direction));
  }

  if (options?.limit) {
    q = query(q, limit(options.limit));
  }

  return onSnapshot(q, (querySnapshot) => {
    const documents = querySnapshot.docs.map(doc => convertDocumentData<T>(doc));
    callback(documents);
  });
}; 