import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";

const Welcome = () => {
  const email = sessionStorage.getItem("userEmail");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserLogin = async () => {
      try {
        const q = query(collection(db, "User"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUser(userData);
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getUserLogin();
  }, [email]);

  const userName = user ? user.nama : "";

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Welcome Back {userName}</h1>
    </div>
  );
};

export default Welcome;
