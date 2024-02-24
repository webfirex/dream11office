
import { type GetServerSidePropsContext } from "next";
import { BackHeader } from "~/components/header/back";
import { CommonLayout } from "~/components/layout/common";
import { TelegramDialog } from "~/components/tele-dialog";
import { ViewCount } from "~/lib/view-count";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await ViewCount({
    context: context,
    path: `/refer`,
    name: "Refer",
  });

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <TelegramDialog />
      <CommonLayout header={<BackHeader />} >
        <section className="w-full flex justify-center items-center" style={{ backgroundImage: 'url(prime-bg.png)', minHeight: 'calc(100vh - 100px)', backgroundPosition: ' center', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <a href="https://someshthakre.com/pay.php" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', borderRadius: '15px', boxShadow: '0 0 10px rgba(0,0,0,0.6)', width: '100%' }}>
                <img src="prime-b.png" alt="banner" style={{ width: '100%' }} />
            </a>
        </section>
      </CommonLayout>
    </>
  );
}