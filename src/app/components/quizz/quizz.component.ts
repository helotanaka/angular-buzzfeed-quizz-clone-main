import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string | { name: string; image: string; description: string; } =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  texto:string =""


  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }
  resetQuiz() {
  this.questionIndex = 0;
  this.answers = [];
  this.finished = false;
  this.answerSelected = "";
  this.questionSelected = this.questions[this.questionIndex];
}

funcionarbtn() {
  if (this.finished === false && this.questionIndex > 0) {
    return true;
  } else {
    return false;
  }
}


voltar() {
  this.questionIndex-- ;
  this.answers.pop;
  this.finished = false;
  this.questionSelected = this.questions[this.questionIndex];
}

description() {
  if (this.answerSelected === "Venti!") {
    return "Você é uma pessoa descontraída, alegre e que sempre busca aproveitar a vida ao máximo. Assim como Venti, você tem um espírito livre e gosta de explorar o mundo ao seu redor.";
  } else if (this.answerSelected === "Zhongli!") {
    return "Você é uma pessoa sábia, elegante e reservada, que prefere observar e analisar as coisas antes de agir. Assim como Zhongli, você tem uma personalidade serena e equilibrada, e gosta de apreciar as coisas belas da vida.";
  } else if (this.answerSelected === "Raiden Shogun!") {
    return "Você é uma pessoa determinada, ambiciosa e que sabe o que quer. Assim como Raiden Shogun, você tem uma personalidade forte e dominante, e gosta de liderar e controlar as situações ao seu redor.";
  } else if (this.answerSelected === "Nahida!") {
    return "Você é uma pessoa gentil, empática e preocupada com os outros. Assim como Nahida, você tem um coração bondoso e generoso, e gosta de ajudar as pessoas ao seu redor sempre que possível.";
  } else {
    return ""
  }
}

image() {
  if (this.answerSelected === "Venti!") {
    return "assets/imgs/Venti.jpg";
  } else if (this.answerSelected === "Zhongli!") {
    return "assets/imgs/Zhongli.jpg";
  } else if (this.answerSelected === "Raiden Shogun!") {
    return "assets/imgs/RaidenShogun.jpg";
  } else if (this.answerSelected === "Nahida!") {
    return "assets/imgs/Nahida.jpg";
  } else {
    return ""
  }
}

}
