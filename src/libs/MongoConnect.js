import { MongoClient } from "mongodb"
 
if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URL"')
}
 
const uri = process.env.MONGO_URL
const options = {}
 
let client = new MongoClient(uri,options);
let clientPromise;
 

if (process.env.NODE_ENV === "development") {

  if(!global._mongoClientPromise){ 
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise

} else {
  clientPromise = client.connect()
}
export default clientPromise