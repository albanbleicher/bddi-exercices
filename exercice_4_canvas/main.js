document.addEventListener('DOMContentLoaded', () =>{
    let canvas = document.querySelector('canvas');
    canvas.width = 200;
    canvas.height = 200;
    let ctx = canvas.getContext('2d');
    ctx.moveTo(0,0);
    ctx.lineTo(200,100),
    ctx.stroke();
    let counter=0;
    animate();
    function animate() {
        canvas.width = canvas.width;
        requestAnimationFrame(animate);
        ctx.moveTo(counter % canvas.width,0);
        ctx.lineTo(200,100);
        ctx.stroke();
        counter++;
        }
})