import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("open", () => console.log("connected to db"));
  db.on("error", (e) => console.log(e));
};
