<footer>
<p class="time"></p>
</footer>
<script>
function telltime(){
	var logelem = document.querySelector(".time");
	var update = new Date('06 February 2020');
	var now = new Date();
	var diff = Math.floor(((now-update).toString())/86400000);
	logelem.innerHTML = <p> hello</p"this page was updated " + diff+" days ago. That's It.  <a href="https://www.youtube.com/watch?v=nhB06T77QPQ" rel="prefetch"> Show's Over.</a>";
}
telltime();
</script>