import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC7EWt8dMMx6rp57R-_xQv_fNd9CVXdyOs',
  authDomain: 'readwise-project-33854.firebaseapp.com',
  projectId: 'readwise-project-33854',
  storageBucket: 'readwise-project-33854.appspot.com',
  messagingSenderId: '668540049600',
  appId: '1:668540049600:web:480b15c67051e49cc5b525',
  measurementId: 'G-L8YQWWNTDX',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
