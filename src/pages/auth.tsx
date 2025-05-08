'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Center, Divider, Image, Input, NumberInput, PasswordInput, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Loading() {
  const router = useRouter();
  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
            {state === 'signup' && <Input type="text" placeholder="Name" w={'100%'} value={name} onChange={() => {}} mt={'20px'} />}
            <NumberInput placeholder="Phone Number" w={'100%'} value={phone} onChange={() => {}} />
            <PasswordInput placeholder="Password" w={'100%'} value={password} onChange={() => {}} />
            {state === 'signup' ? <Button variant="filled" color="green" w={'100%'}>Sign Up</Button> : <Button variant="filled" color="green" w={'100%'}>Log In</Button>}
            <Divider variant="solid" content="or" c={"dark"} w={'100%'} my={'25px'} labelPosition="center" label="or" />
            <Button variant="transparent" color="dark" w={'100%'} onClick={() => {state === 'signup' ? setState('login') : setState('signup')}}>{state === 'signup' ? 'Log In' : 'Sign Up'}</Button>
        </div>
      </Center>
    </>
  );
}
