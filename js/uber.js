window.UberApp = function(){
	let self = this;
	self.$el = $(`
		<app>
			<layer>
				<map>
					<maptranslate>
						<svg width=3000 height=3000 viewBox='0 0 1.5 1.5'></svg>
						<car r=270>
							<pursuers>
								<police r=180></police>
								<police r=180></police>
								<police r=180></police>
							</pursuers>
						</car>
					</maptranslate>
				</map>
			</layer>
			<layer>
				<panel>
					<textentry>Where to?</textentry>
				</panel>
				<panel glue='bottom'>
					<arrival>
						<p><avatar><rating>4.96</rating></avatar><name>Jeb</name> is arriving in <time>5 minutes</time></p>
					</arrival>
					<messageswrapper>
						<messages>
						</messages>
					</messageswrapper>
				</panel>
				<wanted>
					<img src='./img/ui-wanted.png'/>
					<p>★★★★☆</p>
				</wanted>
			</layer>
		</app>`);

	let $svg = self.$el.find('svg');
	
	const H = 1920;
	const MAPSIZE = 2000;

	const GRID = 100;
	const SIZE = 20;

	let variance = 0;//1/SIZE/8;
	let angle = 1/SIZE*2;
	let junctions = [];

	for(var y=0; y<=SIZE; y++){
		junctions[y] = [];

		let py = (y-SIZE/2)/SIZE * 2;

		for(var x=0; x<=SIZE; x++){

			let px = (x-SIZE/2)/SIZE * 2;

			let pt = {
				x:x/SIZE - variance/2 + Math.random()*variance + py*angle,
				y:y/SIZE - variance/2 + Math.random()*variance - px*angle,
			};

			junctions[y][x] = pt;
		}
	}

	const ROADS = [
		//main roads
		{ thicc:3, from:{x:10,y:0}, to:{x:10,y:20} },
		{ thicc:2, from:{x:0,y:12}, to:{x:11,y:12} },
		{ thicc:2, from:{x:10,y:8}, to:{x:18,y:8} },
		
		

		//left
		{ from:{x:5,y:0}, to:{x:5,y:12} },
		{ from:{x:6,y:14}, to:{x:6,y:20} },
		{ from:{x:7,y:14}, to:{x:7,y:16} },
		{ from:{x:8,y:14}, to:{x:8,y:17} },
		{ from:{x:9,y:14}, to:{x:9,y:16} },
		
		{ from:{x:7,y:9}, to:{x:7,y:12} },
		{ from:{x:9,y:9}, to:{x:9,y:11} },
		{ from:{x:5,y:9}, to:{x:10,y:9} },
		{ from:{x:5,y:10}, to:{x:10,y:10} },
		{ from:{x:2,y:11}, to:{x:10,y:11} },
		{ from:{x:2,y:11}, to:{x:2,y:12} },

		{ from:{x:0,y:1}, to:{x:5,y:1} },
		{ from:{x:0,y:2}, to:{x:10,y:2} },
		{ from:{x:5,y:3}, to:{x:10,y:3} },
		{ from:{x:6,y:3}, to:{x:6,y:4} },
		{ from:{x:7,y:2}, to:{x:7,y:7} },
		{ from:{x:8,y:2}, to:{x:8,y:4} },
		{ from:{x:9,y:2}, to:{x:9,y:6} },
		{ from:{x:0,y:4}, to:{x:10,y:4} },
		{ from:{x:0,y:6}, to:{x:10,y:6} },
		{ from:{x:0,y:7}, to:{x:10,y:7} },

		{ from:{x:0,y:14}, to:{x:10,y:14} },
		{ from:{x:0,y:16}, to:{x:10,y:16} },
		{ from:{x:0,y:17}, to:{x:10,y:17} },
		{ from:{x:0,y:19}, to:{x:10,y:19} },

		//right
		{ from:{x:10,y:9}, to:{x:15,y:9} },
		{ from:{x:15,y:5}, to:{x:15,y:9} },
		{ from:{x:15,y:5}, to:{x:18,y:5} },
		{ from:{x:15,y:6}, to:{x:18,y:6} },
		{ from:{x:15,y:7}, to:{x:18,y:7} },
		{ from:{x:18,y:0}, to:{x:18,y:20} },

		{ from:{x:10,y:1}, to:{x:18,y:1} },
		{ from:{x:10,y:3}, to:{x:18,y:3} },
		{ from:{x:10,y:4}, to:{x:18,y:4} },

		{ from:{x:10,y:13}, to:{x:18,y:13} },
		{ from:{x:10,y:14}, to:{x:13,y:14} },
		{ from:{x:13,y:13}, to:{x:13,y:17} },
		{ from:{x:10,y:15}, to:{x:18,y:15} },
		{ from:{x:10,y:17}, to:{x:18,y:17} },
		{ from:{x:10,y:18}, to:{x:18,y:18} },

		{ from:{x:11,y:8}, to:{x:11,y:12} },

		//ocean
		{ thicc:10, from:{x:20,y:0}, to:{x:20,y:20} },

	]

	for(var r in ROADS){
		let road = ROADS[r];

		let d = '';

		for(var x=road.from.x; x<=road.to.x; x++){
			for(var y=road.from.y; y<=road.to.y; y++){
				d = d+(d.length?' L':' M')+junctions[y][x].x+','+junctions[y][x].y;
			}
		}

		$(`<path vector-effect='non-scaling-stroke' d='${d}'>`)
		.attr('thicc',road.thicc)
		.appendTo($svg);
	}

	function showPath(){
		const PATH = [
			{x:13,y:4},
			{x:10,y:4},
			{x:10,y:14},
			{x:5,y:14},
		]

		let d = '';
		for(var p in PATH){

			let corner = PATH[p];

			d = d+(d.length?' L':' M')+junctions[corner.y][corner.x].x+','+junctions[corner.y][corner.x].y;

			$(`<path stroke='black' vector-effect='non-scaling-stroke' d='${d}'>`)
			.attr('thicc',1)
			.appendTo('svg');
		}

		$('svg').html($('svg').html());

		let s = PATH[0];

		$('car').css({
			left:junctions[s.y][s.x].x*MAPSIZE,
			top:junctions[s.y][s.x].y*MAPSIZE,
		}).attr('r',180).show();
	}

	function addCharacter(x,y,img,text){
		let $char = $(`
			<character style='background-image:url(${img})'>
			</character>`).appendTo('maptranslate').css({
			left:junctions[y][x].x*MAPSIZE,
			top:junctions[y][x].y*MAPSIZE,
		}).attr('id',text);

		return $char;
	}

	function addDestination(x,y,img,text){
		let $destination = $(`
			<destination>

			</destination>`).appendTo('maptranslate').css({
			left:junctions[y][x].x*MAPSIZE,
			top:junctions[y][x].y*MAPSIZE,
		}).attr('id',text);

		if(img || text){
			let $marker = $(`<marker>`).appendTo($destination);
			if(img) $(`<markericon style='background-image:url(${img})'></markericon>`).appendTo($marker);
			if(text) $(`<markername>${text}</markername>`).appendTo($marker);					
		}

	}

	function removeDestination(id) {
		$('destination[id="'+id+'"]').hide();
	}

	function addMessage(str,isMe){
		let $msg = $(`<message type=${isMe?'me':''}><p>● ● ●</p></message>`).appendTo('messages').css('opacity',0.5);

		setTimeout(function(){
			$msg.css('opacity',1).find('p').text(str);
		},500);
	}

	

	$(document).on('keypress',function(e){
		if(e.which==32) doNextStep();
	})

	function carSwerve(x,y,deg,duration){

		let nTick = 0;
		$('car').animate({
			
			left:junctions[y][x].x*MAPSIZE,
			top:junctions[y][x].y*MAPSIZE,
		},{
			step:function(){
				nTick++;

				if(nTick%20==0){
					let nDirSwerve = -1 + Math.floor( Math.random()*3 );
					$('car').attr('r',deg + nDirSwerve * 45);
				}
				
			},
			duration: duration,
			easing:'linear',
		});
	}

	function carTo(x,y,deg,duration=2000){
		
		$('car').animate({
			
			left:junctions[y][x].x*MAPSIZE,
			top:junctions[y][x].y*MAPSIZE,
		},{
			start:function(){
				if(deg != undefined) $('car').attr('r',deg);
			},
			duration:duration,
			easing:'linear',
		});
	}

	let nStep = -1;
	function doNextStep(){
		nStep++;
		if(QUEUE[nStep]) QUEUE[nStep]();
	}


	$svg.html( $svg.html());
	self.$el.find('panel').last().hide();
	self.$el.find('car').hide();
	self.$el.find('messageswrapper').hide();
	

	const QUEUE = [
		() => {
			$('textentry').text('Current Location');
			addDestination(5,14);
			$('maptranslate').animate({
				left: 250,
				top: 0,
			})
		},() => {
			$('maptranslate').animate({
				top: 0,
				left: 100,
			})
			$('panel').eq(0).animate({top:-300});
			showPath();
			addDestination(13,4);
			addDestination(5,14,undefined,'Destination');
			$('panel').last().show();

			carTo(10,4,180);
			carTo(10,6,270);
		},()=> {
			carTo(7,6,180);
		},() => {
			$('time').text('15 minutes');
			addDestination(7,6,'./img/icon-mcdonalds.svg','McDonalds');
		},() => {
			$('messageswrapper').show();
			$('messageswrapper').css({height:0}).animate({height:450});
			addMessage('boss do you want McChicken?');
			$('maptranslate').animate({
				top: -300,
				left: 200,
			})
		},() => {
			addMessage('2for1 🙏');
		},() => {
			addMessage('you give 5 stars?');
		},() => {
			removeDestination('McDonalds');
			carTo(10,6,0);
			carTo(10,7,270);
		},() => {
			addMessage('can i open the box? ');
		},() => {
			addMessage('don’t open the box',true);
		},() => {
			addMessage('ok i won’t');
		},() => {
			// car goes off-road
			carSwerve(10,8,270,1000);
			carSwerve(7,8,180,5000);
		},()=>{
			carTo(5,8,180,2500);
		},() => {
			addMessage('ssssss');
		},()=> {
			$('name').text('Snake');
			$('rating').text('2.75');
			$('avatar').css('background-image','url(./img/avatar-snake.png)');
			addMessage('this issss my car now');
		},()=>{
			carTo(5,7,90);
			carTo(10,7,0);
			carTo(10,9,270);
			carTo(6,9,180);
		},() => {
			$('time').text('37 minutes');
			addDestination(6,9,'./img/icon-snake.png','Late n Live Sexy Snake Show');
		},() => {
			removeDestination('Late n Live Sexy Snake Show');
			carTo(5,9,180);
			carTo(5,12,270);
		},()=> {
			addMessage('got kicked out - they were all prudesssss anyway');
			$('time').text('3 minutes');
		},()=>{
			carTo(7,12,0,500);
		},()=>{
			addCharacter(9,12,'./img/char-nun.png');
		},()=>{
			addCharacter(9,12,'./img/char-blood.png');
			carTo(11,12,0,500);
			
		},()=>{
			$('maptranslate').animate({
				left: 0,
				top: -100,
			})
			carTo(11,11,90,500);
			addCharacter(11,10,'./img/char-rhino.png');
		},()=>{
			addCharacter(11,10,'./img/char-blood.png');
			carTo(11,8,90,500);
		},()=>{
			carTo(12,8,0,500);
			addCharacter(13,7,'./img/char-reviewer.png');
		},()=>{
			addCharacter(13,7,'./img/char-blood.png');
			carTo(14,6,45,500);
		},() => {
			carTo(14,8,270);
			carTo(15,8,0);
			$('maptranslate').animate({
				left: -300,
				top: -100,
			})
		},()=>{
			$('wanted').show();
		},()=>{
			carTo(16,8,0);
			$('police').eq(0).show();
		},()=>{
			carTo(18,8,0);
			$('police').eq(1).show();
			$('police').eq(2).show();
			$('maptranslate').animate({
				left: -520,
				top: -100,
			})
		},() => {
			addMessage('adiossss fuckheadss');
		},()=>{
			carTo(20,8,0,1000);
		},() => {
			$('car').css('background','none');
			let $ripple = addCharacter(20,8,'./img/char-ripple.png');
			$ripple.css({
				'transform':'translate(-50%, -50%) scale(2)',
				'opacity':0.5});
		},()=>{
			addMessage('ssSs');
		},()=> {
			addMessage('5 starsss bosss?');
		}
	]

}