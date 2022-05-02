import { Component } from '@angular/core';
import * as math from 'mathjs';
import functionPlot from 'function-plot'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'function-plotter';
  equation: string = "";
  width: any;
  height: any;
  xmin: any;
  xmax: any;
  notValidExp = false;
  notValidParam = false;
  notValidVar = false;

  onSubmit() {
    if(!this.validateXvalues()){
      this.notValidParam = true;
      return;
    }
    this.notValidParam = false;
    if(this.validateEquation()){
      this.notValidExp = false;
      this.notValidVar = false;
      this.width = document.getElementById("graph")?.offsetWidth;
      this.height = 400;
      this.showSolution();
    }
    else{
      this.notValidExp = true;
    }
  }

  validateEquation(): Boolean {
    try {
      const r = math.evaluate("f(x)=" + this.equation.toLowerCase());
      if (!r) {//not valid expr
        return false;
      } 
    } catch (e) {//eval exception
      return false;
    }
    return true;
  }

  validateXvalues(): Boolean {
    if(this.xmin == null || this.xmax == null || this.xmin >= this.xmax) return false;
    return true;
  }

  showSolution(){
    try{
      functionPlot({
      target: "#graph",
      width: this.width,
      height: this.height,
      xAxis: {
        domain: [this.xmin, this.xmax]
      },
      yAxis: { domain: [-5, 10] },
      grid: true,
      data: [
        {
          fn: this.equation,
        }
      ]
    });
    }
    catch(e){
      this.notValidVar = true;
    }
    
  }
}
