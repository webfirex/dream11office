'use client'
import { Button, Divider, FileInput, Group, Image, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Link from "next/link";
import { IconPhotoScan } from "@tabler/icons-react";

export const CommonHeader = () => {
  const [sidebar, setSidebar] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [profPic, setProfPic] = useState('https://i.ibb.co/z7fBxBH/pofpic-451687-1727852968461.png');

  const handleSelectImage = async () => {
    try {
      const formData = new FormData();
      if (file) {formData.append("image", file)}
      formData.append("id", phone);

      const response = await fetch('https://api.imgbb.com/1/upload?key=3f6e83c8546b982727ada71053dd995c', {
        method: 'POST',
        body: formData,
      });

      const imgbbData = await response.json();

      if (imgbbData.data.url) {
        Cookies.set('profPic', imgbbData.data.url, {expires: 90, path: '/'})
        setProfPic(imgbbData.data.url);
      }

    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  useEffect(() => {
    const pic = Cookies.get('profPic')
    const name = Cookies.get('uName')
    const phone = Cookies.get('uPhone')


    if (pic) {
      setProfPic(pic)
    }
    if (name) {
      setName(name)
    }
    if (phone) {
      setPhone(phone)
    }
  }, [])

  return (
    <>
      <Group h="100%" px="xs" bg="#a50c0c" display={"flex"} justify={"space-between"} style={{ boxShadow: '0 0 10px #00000050', borderTop: '1px', borderColor: '#00000050', flexWrap: 'nowrap' }}>
        <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'start', height: '100%'}}>
          <Image src={ !sidebar ? profPic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO8tu34AXoBHkvfWOS8WTAvtf42V2tHomBw&s" } alt="Header Logo" h={35} w={35} radius={'100%'} onClick={() => {sidebar ? setSidebar(false) : setSidebar(true)}} style={{cursor: 'pointer'}} />
          {/* <Title order={4} c={"#fff"}>Head Office</Title> */}
          <Image src="/logoxx.png" alt="Header Logo" h={25} ml={2} />
        </div>
        <Link  href={'Https://telegram.me/realdream11office'}><Image src="/contactusbtn.png" h={30} alt="" />
        </Link>
        
      </Group>
      {sidebar && <div style={{display: 'flex', position: 'fixed', backgroundColor: '#fff', left: '0', padding: '14px', height: '100%', boxShadow: '0 10px 10px #00000050', width: '70%', flexDirection: 'column', gap: '14px' }}>
        {/* <Image src="/h-logo-w.png" alt="Header Logo" w={125} ml={-10} mt={-15} mb={-15} style={{alignSelf: 'start'}} />
        <Divider variant="solid" content="or" c={"dark"} w={'100%'} my={'5px'} labelPosition="center" /> */}
        <h1 style={{margin: '0', fontSize: '20px'}}>Hi, {name}</h1>
        <div style={{display: 'flex', gap: '10px', justifyContent: 'start'}}>
          <Image src={profPic} alt="Header Logo" h={45} w={45} radius={'100%'} style={{cursor: 'pointer'}} />
          <div style={{display: 'flex', gap: '5px', justifyContent: 'start', flexDirection: 'column'}}>
            <p style={{ margin: '0', fontSize: '12px'}}>Name: {name}</p>
            <p style={{ margin: '0', fontSize: '12px'}}>Phone: +91{phone}</p>
          </div>
        </div>
        <FileInput accept="image/png,image/jpeg" rightSection={<IconPhotoScan size={18} stroke={1.5} />} value={file} onChange={setFile} className="mt-2" placeholder={'Upload Profile Pic'} />
        <Button variant="filled" color="green" disabled={file ? false : true} onClick={() => {handleSelectImage()}}>Upload Pic</Button>
        <Button variant="filled" color="red">Logout</Button>
      </div> }
    </>
  );
};
