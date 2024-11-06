import React, { useEffect, useRef } from 'react';

export function BlockchainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = 200;
      canvas.height = 60;
    };
    updateSize();

    // Colors for highlights with reduced opacity
    const highlightColors = [
      'rgba(255, 107, 107, 0.6)', // coral
      'rgba(78, 205, 196, 0.6)',  // turquoise
      'rgba(69, 183, 209, 0.6)',  // sky blue
      'rgba(150, 206, 180, 0.6)', // sage
      'rgba(255, 238, 173, 0.6)', // cream
      'rgba(212, 165, 165, 0.6)', // rose
      'rgba(155, 93, 229, 0.6)',  // purple
      'rgba(0, 187, 249, 0.6)',   // bright blue
    ];

    class Block {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      connection: number;
      isHighlighted: boolean;
      highlightColor: string;
      pulsePhase: number;
      index: number;

      constructor(x: number, index: number) {
        this.x = x;
        this.y = 30;
        this.size = 4; // Reduced size
        this.speed = 0.2; // Slower movement
        this.opacity = Math.random() * 0.15 + 0.1; // More subtle opacity
        this.connection = 0;
        this.isHighlighted = false;
        this.highlightColor = highlightColors[Math.floor(Math.random() * highlightColors.length)];
        this.pulsePhase = 0;
        this.index = index;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw connection line
        if (this.connection > 0) {
          ctx.beginPath();
          ctx.strokeStyle = this.isHighlighted 
            ? `${this.highlightColor}40` 
            : `rgba(255, 255, 255, ${this.opacity * 0.3})`; // More subtle connections
          ctx.lineWidth = 1; // Thinner lines
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.connection, this.y);
          ctx.stroke();
        }

        if (this.isHighlighted) {
          // Subtle glow effect
          const glow = Math.sin(this.pulsePhase) * 0.2 + 0.5; // Reduced pulse intensity
          ctx.beginPath();
          ctx.fillStyle = this.highlightColor.replace('0.6', '0.2'); // More subtle glow
          ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Highlighted block
          ctx.beginPath();
          ctx.fillStyle = this.highlightColor;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtle inner glow
          ctx.beginPath();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // More subtle inner glow
          ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
          ctx.fill();

          this.pulsePhase += 0.08; // Slower pulse
        } else {
          // Normal block with subtle gradient
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.1})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      update() {
        this.x -= this.speed;
        if (this.x < -20) {
          this.x = canvas.width + 20;
          this.opacity = Math.random() * 0.15 + 0.1;
          this.highlightColor = highlightColors[Math.floor(Math.random() * highlightColors.length)];
        }
      }
    }

    // Create blocks with better spacing
    const blocks: Block[] = [];
    const numBlocks = 6; // Reduced number of blocks
    const spacing = canvas.width / (numBlocks - 1); // Even spacing across canvas
    
    for (let i = 0; i < numBlocks; i++) {
      const block = new Block(i * spacing, i);
      if (i < numBlocks - 1) {
        block.connection = spacing - 10; // Slight gap between connections
      }
      blocks.push(block);
    }

    let currentHighlightIndex = 0;

    const highlightNextBlock = () => {
      blocks.forEach(block => block.isHighlighted = false);
      currentHighlightIndex = (currentHighlightIndex + 1) % blocks.length;
      blocks[currentHighlightIndex].isHighlighted = true;
      blocks[currentHighlightIndex].pulsePhase = 0;
      blocks[currentHighlightIndex].highlightColor = highlightColors[Math.floor(Math.random() * highlightColors.length)];
    };

    blocks[0].isHighlighted = true;

    const highlightInterval = setInterval(highlightNextBlock, 3000); // Slower transitions

    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      blocks.forEach(block => {
        block.update();
        block.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(highlightInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="opacity-60" // Reduced overall opacity
      style={{ width: '200px', height: '60px' }}
    />
  );
}