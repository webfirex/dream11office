'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Center, Divider, Image, Input, NumberInput, PasswordInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Loading() {
  const router = useRouter();
  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string | number>('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (name != '' && phone != '' && password != '') {
      setIsSubmitting(true);

      const response = await fetch(`https://admin.book1strank.com/11/data.php?action=add&name=${name}&password=${password}&phone=${phone}`);
    
      const data = await response.json();

      if (data.success) {
        Cookies.set('uName', name, {expires: 90, path: '/'})
        Cookies.set('uPhone', phone.toString(), {expires: 90, path: '/'})
        void router.push("/app");
        setIsSubmitting(false);
      } else {
        setError('User already exists')
        setIsSubmitting(false);
      }
    }
  }

  const handleLogin = async () => {
    if (phone != '' && password != '') {
      setIsSubmitting(true);

      const response = await fetch(`https://admin.book1strank.com/11/data.php?action=verify&password=${password}&phone=${phone}`);
    
      const data = await response.json();

      if (data.success) {
        Cookies.set('uName', name, {expires: 90, path: '/'})
        Cookies.set('uPhone', phone.toString(), {expires: 90, path: '/'})
        void router.push("/app");
        setIsSubmitting(false);
      } else {
        setError('Incorrect phone number / password')
        setIsSubmitting(false);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
    //   void router.push("/app");
    }, 5000);
  }, []);
 
  return (
    <>
      <Center h="100vh" bg="#fff" style={{ position: 'relative' }}>
        <Image src={'/cricket-ball.png'} className=" cricketBallImg " />
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'end', alignItems: 'center', minHeight: '500px', position: 'absolute', bottom: '0', padding: '14px', width: '100%'}} className="authPageForm">
            <Image src={'/logo-h-w.png'} style={{maxWidth: '150px'}} />
            <Title c={'red'} order={3} ta={'center'} tt={'uppercase'}>{state === 'signup' ? 'Sign Up & Start Winning' : 'Welcome Back ! Log In'}</Title>
            {state === 'signup' && <Input type="text" placeholder="Name" w={'100%'} value={name} onChange={(event) => setName(event.currentTarget.value)} mt={'20px'} />}
            <NumberInput placeholder="Phone Number" w={'100%'} value={phone} onChange={setPhone} />
            <PasswordInput placeholder="Password" w={'100%'} value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
            {state === 'signup' ? <Button variant="filled" color="green" w={'100%'} onClick={() => {handleSignup()}} disabled={isSubmitting}>Sign Up</Button> : <Button variant="filled" color="green" w={'100%'} onClick={() => {handleLogin()}} disabled={isSubmitting}>Log In</Button>}
            <p style={{color: 'red', margin: 0, padding: 0, fontSize: '12px'}}>{error}</p>
            <Divider variant="solid" content="or" c={"dark"} w={'100%'} my={'25px'} labelPosition="center" label="or" />
            <Button variant="transparent" color="dark" w={'100%'} onClick={() => {state === 'signup' ? setState('login') : setState('signup')}}>{state === 'signup' ? 'Log In' : 'Sign Up'}</Button>
        </div>
      </Center>
    </>
  );
}
