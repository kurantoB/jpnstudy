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
		$entryDiv.append($('<hr>'))
		$entryDiv.append($('<h2>').text(entry.category));
		const $bankContents = addFromBank(entry.bank);
		$entryDiv.append($bankContents);
	}
	return result;
}

function addFromBank(bank) {
	let $bankContents = $('<div>');
	// get two random sections from the bank array.
	if (bank.length > 0) {
		for (let i = 0; i < 2; i++) {
			const randomSectionIndex = Math.floor(Math.random() * bank.length);
			const randomSection = bank[randomSectionIndex];

			let $sectionContents = $('<div>');
			$bankContents.append($sectionContents);

			$sectionContents.append($('<h3>').text(randomSection.section));
			for (let j = 0; j < 2; j++) {
				const randomItemIndex = Math.floor(Math.random() * randomSection.bank.length);
				$sectionContents.append($('<p>').text(randomSection.bank[randomItemIndex].romaji));
				$sectionContents.append($('<p>').text(randomSection.bank[randomItemIndex].sentence));
				if (randomSection.bank.length == 1) {
					break;
				}
			}
		}
	}
	return $bankContents;
}

$(document).ready(loadJpnJson);