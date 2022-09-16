// First train the neural network
// Önce sinir ağını eğit
var net2 = new brain.NeuralNetwork();
net2.train([
{ input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 } },
{ input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 } },
{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
{ input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
{ input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
{ input: { r: 0.07, g: 0.34, b: 0.0 }, output: { white: 1 } },
{ input: { r: 1.0, g: 0.50, b: 0.50 }, output: { black: 1 } }]);

var output;

// Color handling
// Renk kullanımı
const input = document.getElementById('color');

// Here happens the everything.
// İşte her şey olur.
function changeColor(e) {
  document.body.style.backgroundColor = e.target.value;
  color = hexToRgb(e.target.value);
  Object.keys(color).map(function (key, index) {
    color[key] = +(color[key] / 255).toFixed(2);
  });
  output = net2.run(color);
  document.body.style.color = likely(output);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  // Shorthand formunu (ör. "03F") tam forma (ör. "0033FF") genişletin.
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16) } :
  null;
}

function likely(result) {
  result.white > result.black ? document.getElementById('renk').innerHTML = "white"  : document.getElementById('renk').innerHTML = "black" ;
  return result.white > result.black ? "white" : "black";
}

input.addEventListener('input', changeColor);


// Burası canvaslardaki verilerin işlenip modelin eğitildiği kısım
   
      // var input1 = document.getElementById('birinci').value;
      //   var input2 = document.getElementById('ikinci').value;
        const pc1 = new DrawableCanvas(document.getElementById('p1'))
        const pc2 = new DrawableCanvas(document.getElementById('p2'))
        const pc3 = new DrawableCanvas(document.getElementById('p3'))
        const nc1 = new DrawableCanvas(document.getElementById('n1'))
        const nc2 = new DrawableCanvas(document.getElementById('n2'))
        const nc3 = new DrawableCanvas(document.getElementById('n3'))
        const gc = new DrawableCanvas(document.getElementById('g'))

        const net = new brain.NeuralNetwork()

        document.getElementById("train").addEventListener('click', () => {

            const data = []
            data.push({ input: pc1.getVector(dbg.checked), output: {bir: 1} })
            data.push({ input: pc2.getVector(dbg.checked), output: {bir: 1} })
            data.push({ input: pc3.getVector(dbg.checked), output: {bir: 1} })
            data.push({ input: nc1.getVector(dbg.checked), output: {iki: 1} })
            data.push({ input: nc2.getVector(dbg.checked), output: {iki: 1} })
            data.push({ input: nc3.getVector(dbg.checked), output: {iki: 1} })

            const result = net.train(data, {
              log: (error) => dizi.push(error)
              , logPeriod: 2})

            dizi.push(result.error);
            err.innerHTML = result.error
            iterations.innerHTML = result.iterations
            res.removeAttribute('style')
        })

         demo = {

  initLandingPageChart: function() {

    var ctx = document.getElementById('chartBig').getContext("2d");
var GrafikDizisi = [ 0.008, 0.0059, 0.006, 0.004,0.003, 0.003,  0.002,0.0026, 0.0026,  0.0024];
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");

    var chartBig = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: ["İterasyon 10", "İterasyon 20", "İterasyon 30", "İterasyon 40","İterasyon 50", "İterasyon 60","İterasyon 70", "İterasyon 80","İterasyon 90", "İterasyon 97" ],
        datasets: [{
          label: "Data",
          fill: true,
          backgroundColor: gradientFill,
          borderColor: '#e44cc4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#e44cc4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#be55ed',
          //pointHoverBorderColor:'rgba(35,46,55,1)',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: GrafikDizisi
        }]
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#ccc',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              display: true,
              suggestedMin: 0,
              suggestedMax: 0.009,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,0,0,0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }]
        }
      }}


      );


  }
}


        guess.addEventListener('click', () => {
            const result = brain.likely(gc.getVector(), net)
             if (result=='bir') {
                    EkranaBas();
            }else{
                    EkranaBas2();
            }
            // alert(result)
            gc.reset()
        })
