import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminProducts = () => {
  const userData = useSelector((state) => state.userState);
  const router = useRouter();

  useEffect(() => {
    if (!userData.isAdmin) {
      router.replace("/");
    }
  }, []);

  return <section>Admin products</section>;
};

export default AdminProducts;
