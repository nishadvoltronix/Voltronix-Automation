import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let circuitNodes = [];
    let dataStreams = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for floating industrial elements
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.type = Math.random() > 0.5 ? 'gear' : 'dot';
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        if (this.type === 'gear') {
          // Draw gear shape
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.strokeStyle = '#00d4ff';
          ctx.lineWidth = 1;
          
          const teeth = 8;
          const outerRadius = this.size * 4;
          const innerRadius = this.size * 2;
          
          ctx.beginPath();
          for (let i = 0; i < teeth * 2; i++) {
            const angle = (i / (teeth * 2)) * Math.PI * 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          
          // Center hole
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Draw circuit dot
          ctx.fillStyle = '#00d4ff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00d4ff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Circuit Node class
    class CircuitNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.8;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.connections = [];
        this.baseOpacity = Math.random() * 0.12 + 0.04;
      }

      update() {
        this.pulsePhase += 0.01;
        
        // Find nearby nodes to connect
        this.connections = circuitNodes.filter(node => {
          if (node === this) return false;
          const dx = node.x - this.x;
          const dy = node.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance < 150;
        }).slice(0, 3); // Max 3 connections
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        
        ctx.save();
        ctx.globalAlpha = this.baseOpacity;
        
        // Draw connections
        this.connections.forEach(node => {
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 * pulse})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
          
          // Draw data packet moving along connection
          const packetPos = (Date.now() / 2000) % 1;
          const packetX = this.x + (node.x - this.x) * packetPos;
          const packetY = this.y + (node.y - this.y) * packetPos;
          
          ctx.fillStyle = '#ff6b35';
          ctx.shadowBlur = 3;
          ctx.shadowColor = '#ff6b35';
          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw node
        ctx.fillStyle = '#00d4ff';
        ctx.shadowBlur = 5 + pulse * 5;
        ctx.shadowColor = '#00d4ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Data Stream class
    class DataStream {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.speed = Math.random() * 0.8 + 0.3;
        this.length = Math.random() * 15 + 5;
        this.opacity = Math.random() * 0.12 + 0.04;
        this.chars = '01';
        this.charArray = [];
        
        for (let i = 0; i < this.length; i++) {
          this.charArray.push(this.chars[Math.floor(Math.random() * this.chars.length)]);
        }
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00d4ff';
        ctx.font = '10px monospace';
        
        this.charArray.forEach((char, i) => {
          const charY = this.y - i * 12;
          if (charY > 0 && charY < canvas.height) {
            ctx.fillText(char, this.x, charY);
          }
        });
        
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < 25; i++) {
      particles.push(new Particle());
    }

    // Initialize circuit nodes
    for (let i = 0; i < 15; i++) {
      circuitNodes.push(new CircuitNode());
    }

    // Initialize data streams
    for (let i = 0; i < 8; i++) {
      dataStreams.push(new DataStream());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw circuit nodes and connections
      circuitNodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Draw data streams
      dataStreams.forEach(stream => {
        stream.update();
        stream.draw();
      });
      
      // Draw scanning line
      const scanY = (Date.now() / 8000) % (canvas.height + 100) - 50;
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 3;
      ctx.shadowColor = '#00d4ff';
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      ctx.restore();
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
};

export default AnimatedBackground;
