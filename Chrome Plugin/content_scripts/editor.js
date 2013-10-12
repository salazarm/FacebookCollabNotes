var colors = ['#628637', '#3a65ab', '#553786', '#b16623', '#8c2121', '#21818c', '#a13987', '#a7b50d', '#545454'];
var colorIndex = 0;

/* ------------ Editor init ----------- */

document.getElementById('u_0_9').firstChild.innerHTML = '<div id="contributors"></div><input id="add_new" type="text" placeholder="Add people to this note">';
var contributors_node = document.getElementById('contributors');

/* ------------ Add a new contributor ----------- */

/*
person = {
	online: true
	name: name
	id: id
}
*/

var contributorNodes = {};
var contributorColors = {};

function addContributor(person) {
	var node = document.createElement('span');
	node.innerHTML = '<div class="person" id="person_'+person.id+'" style="background-color: '+colors[colorIndex]+';"><img src="http://graph.facebook.com/'+person.id+'/picture">'+person.name+'</div>';
	contributors_node.appendChild(node);
	contributorNodes[person.id] = node;
	contributorColors[person.id] = colors[colorIndex];
	colorIndex++;
	if(colorIndex >= colors.length) colorIndex = 0;
}

function removeContributor(person) {
	contributorNodes[person.id].remove();
	delete contributorNodes[person.id];
	delete contributorColors[person.id];
}

