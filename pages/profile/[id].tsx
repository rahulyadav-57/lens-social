import type { NextPage } from "next";
import { UserProfile } from "../../components/common";
import { Header } from "../../components/ui";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <UserProfile />
      </div>
    </div>
  );
};

export default Home;
