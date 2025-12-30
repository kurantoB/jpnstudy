const SOURCE_URL = 'https://raw.githubusercontent.com/kurantoB/jpnstudy/refs/heads/master/jpn.json';

const $status = $('#status');
const $output = $('#output');

function loadJpnJson() {
	$status.text('Fetching JSON...');
	$.ajax({
		url: SOURCE_URL,
		dataType: 'json',
		cache: false,
		success(data) {
			for (const outputChild of processData(data)) {
				$output.append(outputChild);
			}
			$status.css('display', 'none');
		},
		error(jqXHR, textStatus, errorThrown) {
			$status.text('Failed to load JSON');
			$output.text(textStatus + (errorThrown ? ': ' + errorThrown : ''));
			console.error(textStatus, errorThrown);
		}
	});
}

function processData(data) {
	let result = [];
	for (const entry of data) {
		const $entryDiv = $('<div>');
		result.push($entryDiv);
		$entryDiv.append($('<h2>').text(entry.category));
		const $bankContents = addFromBank(entry.bank);
		$entryDiv.append($bankContents);
	}
	return result;
}

function addFromBank(bank) {
	let $bankContents = $('<div>');
	// get a random element from the bank array.
	if (bank.length > 0) {
		const randomIndex = Math.floor(Math.random() * bank.length);
		const randomElement = bank[randomIndex];
		$bankContents.append($('<p>').text(randomElement.romaji));
		$bankContents.append($('<p>').text(randomElement.sentence));
		$bankContents.append($('<h3>').text(randomElement.section));
	}
	return $bankContents;
}

$(document).ready(loadJpnJson);