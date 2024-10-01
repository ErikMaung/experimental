import React, { useRef, useEffect } from 'react';

function MouseTrail({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let positions = [];
    let animationFrameId;

    // Resize canvas to fill the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle mouse movement
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const timestamp = Date.now();

      positions.push({ x: clientX, y: clientY, time: timestamp });

      // Remove positions older than 1 second
      positions = positions.filter((pos) => timestamp - pos.time <= 1000);
    };

    // Drawing function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < positions.length - 1; i++) {
        const pos = positions[i];
        const nextPos = positions[i + 1];
        const age = Date.now() - pos.time;
        const opacity = 0.75 - age / 1000; // Fade out over 1 second

        ctx.strokeStyle = `rgba(${Math.sin(Date.now() / 1137) * 256}, ${Math.cos(Date.now() / 753) * 256}, ${Math.sin(Date.now() / 930) * 256}, ${opacity})`; // Green color with fading opacity        ctx.lineWidth = 10;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(nextPos.x, nextPos.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', handleMouseMove);
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className} // Apply the className prop here
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    />
  );
}

export default MouseTrail;
