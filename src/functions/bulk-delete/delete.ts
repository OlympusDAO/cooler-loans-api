import admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const firestore = admin.firestore();
const FIRESTORE_ROOT_COLLECTION = "snapshots";

async function bulkDelete(date: string) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date format. Please use YYYY-MM-DD.");
    process.exit(1);
  }

  const collectionRef = firestore.collection(FIRESTORE_ROOT_COLLECTION);
  const query = collectionRef.where(admin.firestore.FieldPath.documentId(), ">=", date);

  const snapshot = await query.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  for (const doc of snapshot.docs) {
    console.log("Deleting " + doc.id);
    await firestore.recursiveDelete(doc.ref);
  }

  console.log("Documents deleted successfully.");
}

const date = process.argv[2];
if (!date) {
  console.error("Please provide a date in YYYY-MM-DD format.");
  process.exit(1);
}

bulkDelete(date).catch(error => {
  console.error("Error deleting documents:", error);
  process.exit(1);
});
