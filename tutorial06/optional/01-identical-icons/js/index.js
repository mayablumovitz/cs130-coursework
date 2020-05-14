const elem = document.getElementById('output');

// Todo: make
const className = 'fa-heart';

count = 0;
while(count<100)
{
  elem.innerHTML += '<i class="fa ' + className + '"></i>';
  count++;
}
