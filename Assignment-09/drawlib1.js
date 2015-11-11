
    function Vector3(x, y, z) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.set(x, y, z);
    }

    Vector3.prototype = {
        set : function(x, y, z) {
           if (x !== undefined) this.x = x;
           if (y !== undefined) this.y = y;
           if (z !== undefined) this.z = z;
        },
        add : function(someVec) {
            return new Vector3(this.x + someVec.x,
                               this.y + someVec.y,
                               this.z + someVec.z);
        },
        sub : function(someVec) {
            return new Vector3(this.x - someVec.x,
                               this.y - someVec.y,
                               this.z - someVec.z);
        },
        multS : function(scalar) {
            return new Vector3(this.x * scalar,
                               this.y * scalar,
                               this.z * scalar);
        }
    }

    function Vector4(x, y, z, t) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.t = 0;
        this.set(x, y, z, t);
    }
    Vector4.prototype = {
        set : function(x, y, z, t) {
            if (x !== undefined) this.x = x;
            if (y !== undefined) this.y = y;
            if (z !== undefined) this.z = z;
            if (t !== undefined) this.t = t;
        },
        dot : function(otherVec) {
            var dotProduct = this.x * otherVec.x +
                             this.y * otherVec.y +
                             this.z * otherVec.z +
                             this.t * otherVec.t;
            return dotProduct;
        }
    }

    function multV(vec, mat) {
       x  = vec.x * mat.v0.x + 
            vec.y * mat.v1.x +
            vec.z * mat.v2.x +
            vec.t * mat.v3.x;
       y  = vec.x * mat.v0.y +
            vec.y * mat.v1.y +
            vec.z * mat.v2.y +
            vec.t * mat.v3.y;
       z  = vec.x * mat.v0.z +
            vec.y * mat.v1.z +
            vec.z * mat.v2.z +
            vec.t * mat.v3.z;
       t = vec.x * mat.v1.t +
            vec.y * mat.v1.t +
            vec.z * mat.v2.t +
            vec.t * mat.v3.t;
       return new Vector4(x, y, z, t);
    }

    function Matrix() {
       this.v0 = new Vector4(0,0,0,0);
       this.v1 = new Vector4(0,0,0,0);
       this.v2 = new Vector4(0,0,0,0);
       this.v3 = new Vector4(0,0,0,0);
       return this;
    }

    Matrix.prototype = {
       set : function(v0, v1, v2, v3) {
         if (v0 !== undefined) this.v0 = v0;
         if (v1 !== undefined) this.v1 = v1;
         if (v2 !== undefined) this.v2 = v2;
         if (v3 !== undefined) this.v3 = v3;
         return this;
       },
       identity : function() {
           (this.v0).set(1, 0, 0, 0);
           (this.v1).set(0, 1, 0, 0);
           (this.v2).set(0, 0, 1, 0);
           (this.v3).set(0, 0, 0, 1);
           return this;
       },
       combine : function(mat2) {
           v0 = multV(this.v0, mat2);
           v1 = multV(this.v1, mat2);
           v2 = multV(this.v2, mat2);
           v3 = multV(this.v3, mat2);
           this.set(v0, v1, v2, v3);
           return this;
       },
       translate : function(x, y, z) {
           var i = new Matrix();
           i.identity();
           i.v0.t = x;
           i.v1.t = y;
           i.v2.t = z;
           this.combine(i);
           return this;
       },
       rotateX : function(theta) {
           var i = new Matrix();
           i.identity();
           i.v1.y =  Math.cos(theta);
           i.v1.z = -Math.sin(theta);
           i.v2.y =  Math.sin(theta);
           i.v2.z =  Math.cos(theta);
           this.combine(i);
           return this;
       },
       rotateY : function(theta) {
           var i = new Matrix();
           i.identity();
           i.v0.x =  Math.cos(theta);
           i.v0.z = -Math.sin(theta);
           i.v2.x =  Math.sin(theta); 
           i.v2.z =  Math.cos(theta);
           this.combine(i);
           return this;
       },
       rotateZ : function(theta) {
           var i = new Matrix();
           i.identity();
           i.v0.x =  Math.cos(theta);
           i.v0.y = -Math.sin(theta);
           i.v1.x =  Math.sin(theta);
           i.v1.y =  Math.cos(theta);
           this.combine(i);
           return this;
       },
       scale  : function(x, y, z) {
           var i = new Matrix();
           i.identity();
           i.v0.x = x;
           i.v1.y = y;
           i.v2.z = z;
           this.combine(i);
           return this;
       },
       transform: function(src, dst) {
           var x = this.v0.dot(src);
           var y = this.v1.dot(src);
           var z = this.v2.dot(src);
           var t = this.v3.dot(src);
           dst.set(x, y, z, t);
           return this;
       }
    }
          
    function viewPortX(w, h, vX) {
        return (w / 2) + vX * (w / 2);
    }

    function viewPortY(w, h, vY) {
        return (h / 2) - vY * (h / 2);
    }
    
    function toModelSpaceX(w, h, x) {
        return x * 1.0 /(w / 2) - 1.0;
    }
    
    function toModelSpaceY(w, h, y) {
        return 1.0 - y * 1.0/(h / 2.0);
    }

    function HSpline(){
        this.positions = [];
    };
    
    var w = 300., h = 200.;

    HSpline.prototype = {
        transform : function(g, m) {
            var r = 20;
            
            var p0, p1, t0, t1, 
                startX, startY,
                curX, curY;
                
            var size = this.positions.length;
            
            for(var i = 0; i < size; ++i){
                g.beginPath();
                var posX = this.positions[i].x;
                var posY = this.positions[i].y;; 

                g.stroke();
                g.closePath();
            }
            
            g.beginPath();

            if(size > 0){
                
                var toPlot = new Vector3(0, 0, 0);
                startX = this.positions[0].x;
                startY = this.positions[0].y;
                g.moveTo(startX, startY);
                for(var i = 1; i < size; ++i){
                    p0 = this.positions[i-1];
                    p1 = this.positions[i];
                    
                    if(i > 1){
                        t0 = p1.sub(this.positions[i-2]);
                        t0 = t0.multS(0.7);
                    } else {
                        t0 = p0.sub(p0);
                    }
                    
                    if(i < size - 1){
                        t1 = this.positions[i+1].sub(p0);
                        t1 = t1.multS(0.7);
                    } else {
                        t1 = p1.sub(p1);
                    }
                    for(var j = 0; j < r; ++j){
                        var t = j / (r - 1.0);
                        var A = 2.0 * t * t * t - 
                                3.0 * t * t     + 
                                1.0;
                        var B =       t * t * t - 
                                2.0 * t * t     + 
                                      t;
                        var C = -2.0 * t * t * t + 
                                 3.0 * t * t;
                        var D =        t * t * t - 
                                       t * t;
                        toPlot.x = A * p0.x +
                                   B * t0.x +
                                   C * p1.x +
                                   D * t1.x;
                        toPlot.y = A * p0.y +
                                   B * t0.y +
                                   C * p1.y +
                                   D * t1.y;
                        toPlot.z = A * p0.z +
                                   B * t0.z +
                                   C * p1.z +
                                   D * t1.z;
                        curX = toPlot.x;
                        curY = toPlot.y;
                        g.lineTo(curX, curY);
                    }
                }
            }
            g.stroke();
        },
        addPoint : function(x, y){
            this.positions.push(new Vector3(x, 
                                            y,
                                            0));
        },
        reset : function(){
            this.positions = [];
        },
        detectPoints : function(mousePos){
            var size = this.positions.length;
            var offset = 30;
            for(var i = 0; i < size; i++){
                var index = i;
                var coord = pixelCoord(this.positions[i].x, this.positions[i].y);
                var distX = Math.abs(coord.x - mousePos.x);
                var distY = Math.abs(coord.y - mousePos.y);
                if(distX < offset && distY < offset){
                    return index;
                }
            }
        },
        movePoints : function(index, mousePos){
            this.positions[index].x = mousePos.x;
            this.positions[index].y = mousePos.y;
        },
        deletePoints : function(index){
            this.positions.splice(index, 1);
        }
    };

    function updateInput(canvas, e) {
        canvas.onmouseup = function(ev) {

        }
    }

    var startTime = (new Date()).getTime() / 1000, time = startTime;
    var canvases = [];
    function initCanvas(id) {
      var canvas = document.getElementById(id);
      canvas.setCursor = function(x, y, z) {
         var r = this.getBoundingClientRect();
         this.cursor.set(x - r.left, y - r.top, z);
      }
      canvas.clicked = false;
      canvas.cursor = new Vector3(0, 0, 0);
      canvas.onmousedown = function(e) { this.setCursor(e.clientX, e.clientY, 1); }
      canvas.onmousemove = function(e) { this.setCursor(e.clientX, e.clientY   ); }
      canvas.onmouseup   = function(e) { this.setCursor(e.clientX, e.clientY, 0); 
                                         this.clicked = true;}
      canvases.push(canvas);
      return canvas;
    }
    function tick() {
      time = (new Date()).getTime() / 1000 - startTime;
      for (var i = 0 ; i < canvases.length ; i++)
         if (canvases[i].update !== undefined) {
            var canvas = canvases[i];
            var g = canvas.getContext('2d');
            g.clearRect(0, 0, canvas.width, canvas.height);
            canvas.update(g);
         }
      setTimeout(tick, 1000 / 60);
    }
    tick();
