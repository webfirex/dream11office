import React from 'react';
import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 150px)' }}>
        <Loader color="red" />
      </div>
    </>
  );
};

