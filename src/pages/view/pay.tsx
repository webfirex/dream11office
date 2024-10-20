import { Stack } from "@mantine/core";
import { CommonLayout } from "~/components/layout/common";
import { GurrenteLetterComp } from "~/components/letter";

export default function PayForMatch() {
  
  return (
    <>
      <GurrenteLetterComp />
      <CommonLayout>
        <Stack p="md">
            <img src="/qr.jpg" alt="" className="w-[90%]" />
            <button
            onClick={() => {
                const link = document.createElement('a');
                link.href = '/qr.jpg';
                link.download = 'qr.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }}
            style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#d80000',
                color: 'white',
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer',
            }}
            >
            Download QR and Pay
            </button>
        </Stack>
      </CommonLayout>
    </>
  );
}
