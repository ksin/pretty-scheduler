export default function(){
  this.transition(
    this.hasClass('form-message'),
    this.use('fade', {duration: 1000})
  );
  this.transition(
    this.hasClass('hello'),
    this.use('fade', {duration: 1000})
  );
  this.transition(
    this.hasClass('no-name'),
    this.use('fade', {duration: 1000})
  );
  this.transition(
    this.hasClass('wrong-secret'),
    this.use('fade', {duration: 1000})
  );
  this.transition(
    this.hasClass('success'),
    this.use('fade', {duration: 1000})
  );
  this.transition(
    this.hasClass('event-calendars'),
    this.use('fade', {duration: 1000})
  );
}
