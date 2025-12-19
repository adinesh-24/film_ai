import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsPills = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [hasStarted, setHasStarted] = React.useState(false);

    // Initial Data
    // Initial Data
    const basicPills = [
        { type: 'pill', text: "400K videos", color: "#0c0c0d", width: 140 },
        { type: 'pill', text: "5.8K movies", color: "#0c0c0d", width: 140 },
        { type: 'pill', text: "150K animations", color: "#0c0c0d", width: 180 },
        { type: 'pill', text: "1.5M stills", color: "#ff8c00", width: 200, fontSize: 24 },
        { type: 'pill', text: "5.5K music videos", color: "#0c0c0d", width: 180 },
        { type: 'pill', text: "2K TV series", color: "#2196f3", width: 140 }, // Blue
        { type: 'pill', text: "15K ads", color: "#0c0c0d", width: 120 },
    ];

    // Generate ~50% more content focused on "Views" with varied colors
    const viewPills = [
        { type: 'pill', text: "100K+ views", color: "#e91e63", width: 150 }, // Pink
        { type: 'pill', text: "250K+ views", color: "#0c0c0d", width: 150 },
        { type: 'pill', text: "500K+ views", color: "#9c27b0", width: 150 }, // Purple
        { type: 'pill', text: "1M+ views", color: "#0c0c0d", width: 140 },
        { type: 'pill', text: "750K+ views", color: "#009688", width: 150 }, // Teal
        { type: 'pill', text: "1.2M+ views", color: "#0c0c0d", width: 160 },
        { type: 'pill', text: "300K+ views", color: "#ffc107", width: 150 }, // Amber
        { type: 'pill', text: "900K+ views", color: "#0c0c0d", width: 150 },
        { type: 'pill', text: "2M+ views", color: "#673ab7", width: 140 }, // Deep Purple
        { type: 'pill', text: "50K+ views", color: "#0c0c0d", width: 130 },
        { type: 'pill', text: "5M+ views", color: "#ff5722", width: 140 }, // Deep Orange
        { type: 'pill', text: "800K+ views", color: "#0c0c0d", width: 150 },
    ];

    const pills = [...basicPills, ...viewPills];

    const shapes = [
        { type: 'hexagon', color: '#2fb448', size: 80 },
        { type: 'rect', color: '#1a8f3d', width: 80, height: 110 },
        { type: 'cone', strokeColor: 'rgba(200, 200, 200, 0.5)', size: 60 },
        { type: 'sphere', strokeColor: '#ddd', size: 50 },
        { type: 'eye', color: '#2fb448', size: 30 },
        // New Shapes
        { type: 'hexagon', color: '#e91e63', size: 60 },
        { type: 'rect', color: '#2196f3', width: 60, height: 60 },
        { type: 'sphere', strokeColor: '#ffc107', size: 40 },
        { type: 'cone', strokeColor: '#9c27b0', size: 50 },
        { type: 'rect', color: '#009688', width: 120, height: 40 },
        { type: 'sphere', strokeColor: '#ff5722', size: 70 },
        // More Interactive Eyes
        { type: 'eye', color: '#00bcd4', size: 45 }, // Cyan
        { type: 'eye', color: '#f44336', size: 35 }, // Red
        { type: 'eye', color: '#673ab7', size: 28 }, // Deep Purple
        { type: 'eye', color: '#ffeb3b', size: 42 }, // Yellow
        { type: 'eye', color: '#e91e63', size: 32 }, // Pink
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasStarted) {
                setHasStarted(true);
            }
        }, { threshold: 0.1 });

        if (sceneRef.current) {
            observer.observe(sceneRef.current);
        }

        return () => {
            if (sceneRef.current) observer.unobserve(sceneRef.current);
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Use standard renderer for interaction/mouse binding, but we will custom render frames
        // We set wireframes to false to see if standard debug render helps, but we will overlay mostly.
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                background: 'transparent',
                wireframes: false, // Important for custom colors if we used standard render
                showAngleIndicator: false
            }
        });

        // We actually don't want the default renderer clearing our custom drawing if we hook into it
        // Or we just use a custom loop completely. 
        // Let's use custom loop for full control over styling (Rounded corners with text)

        // Boundaries
        const ground = Bodies.rectangle(width / 2, height + 60, width, 120, {
            isStatic: true,
            render: { opacity: 0 }
        });
        const leftWall = Bodies.rectangle(-60, height / 2, 120, height, {
            isStatic: true,
            render: { opacity: 0 }
        });
        const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height, {
            isStatic: true,
            render: { opacity: 0 }
        });

        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // Create Bodies
        const allItems = [...pills, ...shapes];

        allItems.forEach((item) => {
            const x = Math.random() * (width - 200) + 100;
            const y = Math.random() * -2500 - 100; // Scatter higher up

            let body;

            if (item.type === 'pill') {
                body = Bodies.rectangle(x, y, item.width, 50, {
                    chamfer: { radius: 24 },
                    restitution: 0.5,
                    friction: 0.1
                });
            } else if (item.type === 'hexagon') {
                body = Bodies.polygon(x, y, 6, item.size, {
                    restitution: 0.4,
                    friction: 0.1
                });
            } else if (item.type === 'rect') {
                body = Bodies.rectangle(x, y, item.width, item.height, {
                    restitution: 0.2,
                    friction: 0.2
                });
            } else if (item.type === 'cone') {
                body = Bodies.polygon(x, y, 3, item.size, { // Triangle
                    restitution: 0.5
                });
            } else if (item.type === 'sphere') {
                body = Bodies.circle(x, y, item.size, {
                    restitution: 0.7,
                    friction: 0.05
                });
            } else if (item.type === 'eye') {
                body = Bodies.circle(x, y, item.size, {
                    restitution: 0.6
                });
            }

            if (body) {
                // Attach data for renderer
                body.plugin.data = item;
                Composite.add(engine.world, body);
            }
        });

        // Add Mouse Control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(engine.world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Run the engine
        // Render.run(render); // We will use our own runner for custom drawing

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Add Mouse Events for Interaction
        Events.on(mouseConstraint, 'mousedown', (event) => {
            const mousePosition = event.mouse.position;
            const bodies = Composite.allBodies(engine.world);

            // Check if any body is clicked (simplest way with Matter.js Query or just relying on mouseConstraint.body if active)
            // mouseConstraint.body is null on mousedown sometimes if it hasn't picked it up yet? 
            // Better to rely on the event source or use Query.

            // Actually, mouseConstraint.body is set when dragging starts. Mousedown might be too early?
            // Let's use Query.point
            const clickedBodies = Matter.Query.point(bodies, mousePosition);

            clickedBodies.forEach(body => {
                const data = body.plugin.data;
                if (data && data.type === 'eye') {
                    // Toggle clicked state
                    data.isClicked = !data.isClicked;

                    // Add animation: Jump/Impulse
                    Matter.Body.applyForce(body, body.position, { x: 0, y: -0.05 });
                }
            });
        });

        Events.on(mouseConstraint, 'mousemove', (event) => {
            const mousePosition = event.mouse.position;
            const bodies = Composite.allBodies(engine.world);
            const foundBodies = Matter.Query.point(bodies, mousePosition);

            let isHoveringInteractive = false;
            for (let i = 0; i < foundBodies.length; i++) {
                if (foundBodies[i].plugin.data && foundBodies[i].plugin.data.type === 'eye') {
                    isHoveringInteractive = true;
                    break;
                }
            }

            if (sceneRef.current) {
                sceneRef.current.style.cursor = isHoveringInteractive ? 'pointer' : 'default';
            }
        });

        // Custom Render Loop
        const canvas = render.canvas;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        const draw = () => {
            const bodies = Composite.allBodies(engine.world);

            // Clear Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Use current canvas dims

            bodies.forEach(body => {
                if (body.isStatic) return; // Don't draw walls

                const { vertices, position, angle } = body;
                const data = body.plugin.data || {};

                ctx.save();
                ctx.translate(position.x, position.y);
                ctx.rotate(angle);

                // --- SHAPE RENDERING ---
                if (data.type === 'pill') {
                    // Revert rotate for path because chamfer vertices are world coords? 
                    // Use vertices drawing method
                    ctx.restore();
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j += 1) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.fillStyle = data.color;
                    ctx.fill();

                    // Text
                    ctx.save();
                    ctx.translate(position.x, position.y);
                    ctx.rotate(angle);
                    ctx.fillStyle = data.color === '#ff8c00' ? '#ffffff' : '#ffffff';
                    ctx.font = `${data.fontSize || 16}px 'Inter', sans-serif`;
                    ctx.fontWeight = '600';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(data.text, 0, 0);
                    ctx.restore();

                } else if (data.type === 'hexagon') {
                    ctx.restore(); // Use vertices
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j += 1) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.closePath();
                    ctx.fillStyle = data.color;
                    ctx.fill();

                } else if (data.type === 'rect') {
                    ctx.restore();
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j += 1) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.closePath();
                    ctx.fillStyle = data.color;
                    ctx.fill();

                } else if (data.type === 'cone') {
                    // Wireframe Triangle
                    ctx.restore();
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j += 1) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.closePath();
                    ctx.strokeStyle = data.strokeColor;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                } else if (data.type === 'sphere') {
                    // Circle
                    ctx.beginPath();
                    ctx.arc(0, 0, data.size, 0, 2 * Math.PI);
                    ctx.strokeStyle = data.strokeColor;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    // Optional internal lines?
                    ctx.beginPath();
                    ctx.ellipse(0, 0, data.size, data.size * 0.4, 0, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.restore();

                } else if (data.type === 'eye') {
                    // Eye Back
                    ctx.beginPath();
                    ctx.arc(0, 0, data.size, 0, 2 * Math.PI);
                    ctx.fillStyle = data.color;
                    ctx.fill();

                    if (data.isClicked) {
                        // Draw X
                        ctx.strokeStyle = '#000';
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        const r = data.size * 0.4;
                        ctx.moveTo(-r, -r);
                        ctx.lineTo(r, r);
                        ctx.moveTo(r, -r);
                        ctx.lineTo(-r, r);
                        ctx.stroke();
                    } else {
                        // Pupil
                        ctx.beginPath();
                        ctx.arc(5, 0, data.size * 0.4, 0, 2 * Math.PI); // Slightly offset pupil for character
                        ctx.fillStyle = '#000';
                        ctx.fill();
                    }
                    ctx.restore();
                } else {
                    ctx.restore();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };


        draw();

        // Handle Resize
        const handleResize = () => {
            if (!sceneRef.current) return;
            const newWidth = sceneRef.current.clientWidth;
            const newHeight = sceneRef.current.clientHeight;

            render.canvas.width = newWidth;
            render.canvas.height = newHeight;

            // Reposition Walls
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 });
            Matter.Body.setPosition(rightWall, { x: newWidth + 60, y: newHeight / 2 });
            // Left wall position (x: -60) stays same, just y changes? Center y changes.
            Matter.Body.setPosition(leftWall, { x: -60, y: newHeight / 2 });

            // Update wall dimensions (Need to scale or recreate? Scaling is easier)
            // Actually setPosition is enough for location, but if height changed drastically...
            // It's better to update vertices or just make walls very tall initially.
            // For now, simple repositioning should be enough for basic resize.
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            Matter.Render.stop(render);
            Runner.stop(runner);
            if (engineRef.current) {
                Matter.Engine.clear(engineRef.current);
            }
            if (sceneRef.current) {
                const canvas = sceneRef.current.querySelector('canvas');
                if (canvas) canvas.remove();
            }
        };
    }, [hasStarted]);

    return (
        <div
            ref={sceneRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: 5 // Below Text? Or Above? User said "items... are bodies". Text input "A new language.." is in another component.
                // If interacting, needs to be high z-index.
            }}
        />
    );
};

export default PhysicsPills;
