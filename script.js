var quizData = {
  questions: [
    {
      id: 1,
      description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
      options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein']
    },
    {
      id: 2,
      description: 'Which of the following numbers is the answer to Life, the \
                    universe and everything?',
      options: ['66', '13', '111', '42']
    },
    {
      id: 3,
      description: 'What is Pan Galactic Gargle Blaster?',
      options: ['A drink', 'A machine', 'A creature', 'None of the above']
    },
    {
      id: 4,
      description: 'Which star system does Ford Prefect belong to?',
      options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri']
    }
  ],
  answerKey: { '1': 'Douglas Adams', '2': '42', '3': 'A drink', 4: 'Betelgeuse' },
}

var quiz = {
  loadQuestions: function() {
    var template = $('#entry-template');
    this.data.questions.forEach(function(question, idx) {
      $('#quiz').append(this.loadTemplate(template, question));
    }.bind(this));
  },
  loadTemplate: function(template, context) {
    var source = template.html();
    var compiledTemplate = Handlebars.compile(source);
    return compiledTemplate(context);
  },
  registerHandlers: function() {
    $('#submit').on('click', this.handleSubmit.bind(this));
    $('#reset').on('click', this.handleReset.bind(this));
  },
  handleSubmit: function(e) {
    var $radios = $('input[type=radio]');
    var answers = this.data.answerKey;
    e.preventDefault();
    for (id in answers) {
      var answer = answers[id];
      var guess = $('input[name='+ id + ']:checked').val();
      if (guess === undefined || guess === '') {
        this.noAnswer(answer, id);
      } else if (answer === guess) {
        this.rightAnswer(id);
      } else {
        this.wrongAnswer(answer, id);
      }
    }
  },
  handleReset: function(e) {
    $('.result').remove();
    $('input[type=radio]:checked').attr('checked', false);
  },
  noAnswer: function(answer, id) {
    var template = $('#no-answer-template');
    $('#' + id).after(this.loadTemplate(template, {'answer': answer}));
  },
  wrongAnswer: function(answer, id) {
    var template = $('#wrong-answer-template');
    $('#' + id).after(this.loadTemplate(template, {'answer': answer}));
  },
  rightAnswer: function(id) {
    var template = $('#right-answer-template');
    $('#' + id).after(this.loadTemplate(template, {}))
  },
  init: function() {
    this.data = quizData;
    this.loadQuestions();
    this.registerHandlers();
  }
}

quiz.init();