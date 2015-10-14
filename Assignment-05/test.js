            new Vector3(-.25,-.25,-.25),
            new Vector3( .25,-.25,-.25),
            new Vector3(-.25, .25,-.25),
            new Vector3( .25, .25,-.25),
            new Vector3(-.25,-.25, .25),
            new Vector3( .25,-.25, .25),
            new Vector3(-.25, .25, .25),
            new Vector3( .25, .25, .25) 
            
            
       /*
       var canvas = initCanvas('canvas1');
       canvas.update = function(g) {
          var x, y;

          x = this.cursor.x;
          y = this.cursor.y;

          g.fillStyle = this.cursor.z ? 'red' : 'rgb(128,255,128)';
          g.beginPath();
          g.moveTo(x-50,y-50);
          g.lineTo(x+50,y-50);
          g.lineTo(x+50,y+50);
          g.lineTo(x-50,y+50);
          g.fill();

          g.strokeStyle = 'blue';
          g.beginPath();
          g.moveTo(0,0);
          g.lineTo(this.width,0);
          g.lineTo(this.width,this.height);
          g.lineTo(0,this.height);
          g.lineTo(0,0);
          g.stroke();
       }

       var canvas = initCanvas('canvas1');
       canvas.update = function(g) {
          var x, y;

          g.strokeStyle = 'blue';
          g.beginPath();
          g.moveTo(0,0);
          g.lineTo(this.width,0);
          g.lineTo(this.width,this.height);
          g.lineTo(0,this.height);
          g.lineTo(0,0);
          g.stroke();

          g.lineWidth = 10;
          g.strokeStyle = 'red';
          g.beginPath();
          x = this.width/2;
          y = this.height/2;
          g.moveTo(x - 50, y);
          g.lineTo(x + 50, y);
          g.moveTo(x + 50 * Math.sin(10 * Math.PI * time), y);
          g.lineTo(this.cursor.x, this.cursor.y);
          g.stroke();
       }
       */