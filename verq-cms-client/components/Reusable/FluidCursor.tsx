
'use client';
import { useEffect } from 'react';
import  useLusionFluidCursor  from '@/hooks/useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    useLusionFluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 z-999'>
      <canvas id='fluid' className='w-screen h-screen' style={{ mixBlendMode: 'screen' }}/>
    </div>
  );
};
export default FluidCursor;