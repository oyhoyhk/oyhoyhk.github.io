window.addEventListener('keydown', e => {
	if (e.key === 'Tab') e.preventDefault();
});

const startButton = document.getElementById('start_button');
const mainCover = document.getElementById('main_cover');
const screen = document.getElementById('screen');
const desk = document.getElementById('desk');
const wall = document.getElementById('wall');
const tablet = document.getElementById('tablet');
const clock = document.getElementById('clock');
const note = document.getElementById('note');
const calendar = document.getElementById('calendar');
const backgroundCover = document.getElementById('background_cover');
const exitClockButton = document.getElementById('exit_clock_button');
const exitCalendarButton = document.getElementById('exit_calendar_button');
const exitTabletButton = document.getElementById('exit_tablet_button');
const exitNoteButton = document.getElementById('exit_note_button');
const clockDetail = document.getElementById('clock_detail_container');
const tabletDetail = document.getElementById('tablet_detail_container');
const noteDetailEx = document.getElementById('note_detail_container');
const calendarDetail = document.getElementById('calendar_detail_container');
const screenHomeButton = document.getElementById('screen_home_button');

// 시작 인트로 부분
startButton.addEventListener('click', () => {
	mainCover.style.opacity = 0;
	setTimeout(() => {
		screen.style.opacity = 1;
		mainCover.style.display = 'none';
		desk.style.transform = `rotateZ(-25deg) translateX(-100px) translateY(200px)`;
		wall.style.transform = `rotateZ(-25deg) translateX(-100px) translateY(-324px)`;
		setTimeout(() => {
			tablet.style.opacity = 1;
			calendar.style.opacity = 1;
			note.style.opacity = 1;
			clock.style.opacity = 1;
			screenHomeButton.style.opacity = 1;
			document.getElementById('screen_transparent_cover').style.display = 'none';
		}, 1000);
	}, 1000);
});
screenHomeButton.addEventListener('click', () => {
	tablet.style.opacity = 0;
	calendar.style.opacity = 0;
	note.style.opacity = 0;
	clock.style.opacity = 0;
	screenHomeButton.style.opacity = 0;
	document.getElementById('screen_transparent_cover').style.display = 'block';
	setTimeout(() => {
		screen.style.opacity = 0;
		mainCover.style.display = 'block';
		desk.style.transform = `rotateZ(-25deg) translateX(-1300px) translateY(200px)`;
		wall.style.transform = `rotateZ(-25deg) translateX(1000px) translateY(-324px)`;
		setTimeout(() => {
			mainCover.style.opacity = 1;
		});
	}, 1000);
});

clock.addEventListener('mouseover', () => {
	clockDetail.style.opacity = 1;
	clockDetail.style.transform = 'translateY(0)';
});
clock.addEventListener('mouseleave', () => {
	clockDetail.style.opacity = 0;
	clockDetail.style.transform = 'translateY(50px)';
});
tablet.addEventListener('mouseover', () => {
	tabletDetail.style.opacity = 1;
	tabletDetail.style.transform = 'translateY(0)';
});
tablet.addEventListener('mouseleave', () => {
	tabletDetail.style.opacity = 0;
	tabletDetail.style.transform = 'translateY(50px)';
});
note.addEventListener('mouseover', () => {
	noteDetailEx.style.opacity = 1;
	noteDetailEx.style.transform = 'translateY(0)';
});
note.addEventListener('mouseleave', () => {
	noteDetailEx.style.opacity = 0;
	noteDetailEx.style.transform = 'translateY(50px)';
});
calendar.addEventListener('mouseover', () => {
	calendarDetail.style.opacity = 1;
	calendarDetail.style.transform = 'translateY(0)';
});
calendar.addEventListener('mouseleave', () => {
	calendarDetail.style.opacity = 0;
	calendarDetail.style.transform = 'translateY(-50px)';
});
const alertConfirm = document.getElementById('alert_confirm');
//노트 클릭 이벤트

let noteData = localStorage.data ? JSON.parse(localStorage.data) : {};
const noteDateInput = document.getElementById('note_date_input');
const noteSubmit = document.getElementById('note_submit');
const noteWindow = document.getElementById('note_window');
const noteTitle = document.getElementById('note_title_input');
const noteDetail = document.getElementById('note_detail');

note.addEventListener('click', () => {
	noteDateInput.value = new Date().toISOString().slice(0, 10);
	backgroundCover.style.display = 'block';
	setTimeout(() => {
		backgroundCover.style.opacity = 1;
	}, 50);
	noteWindow.style.top = `calc(50% - 350px)`;
	exitNoteButton.style.display = 'block';
	createNoteRecordsList();
});

exitNoteButton.addEventListener('click', () => {
	noteWindow.style.top = '130%';
	exitNoteButton.style.display = 'none';
	backgroundCover.style.opacity = 0;
	setTimeout(() => {
		backgroundCover.style.display = 'none';
	}, 900);
	setTimeout(() => {
		noteTitle.value = '';
		noteDetail.value = '';
	}, 500);
});

function createNoteRecordsList() {
	days = Object.keys(localStorageData);
	const recordBackgroundInfo = ['rgb(255, 108, 108)', '#ffbc57', '#ffa060', '#a6fc75', '#78b5fc', '#8e78f1', '#c578f1'];
	const noteRecordCotnainer = document.getElementById('note_record_container');
	noteRecordCotnainer.innerHTML = '';
	days.forEach(day => {
		localStorageData[day].forEach((el, idx) => {
			const record = document.createElement('div');
			record.classList.add('note_record');
			const date = document.createElement('div');
			date.classList.add('record_date');
			const title = document.createElement('div');
			const randomNum = Math.floor(Math.random() * 7);

			record.style.background = recordBackgroundInfo[randomNum];
			date.textContent = `${day.replace(/-/, '.')}`;
			title.textContent = `${el[0].slice(0, 3)}...`;
			record.appendChild(title);
			record.appendChild(date);
			record.addEventListener('click', () => {
				noteTitle.value = el[0];
				noteDetail.value = el[1];
				noteDateInput.value = day;
			});
			noteRecordCotnainer.appendChild(record);
		});
	});
}
noteSubmit.addEventListener('click', e => {
	if (noteTitle.value === '') {
		loadAlertWindow(false, '제목을 입력해주세요');
		return;
	}
	const dateInfo = noteDateInput.value;
	const dateValue = dateInfo.split('-').map(el => parseInt(el));
	if (!localStorageData[dateInfo]) {
		localStorageData[dateInfo] = [[noteTitle.value, noteDetail.value || '']];
	} else {
		localStorageData[dateInfo].push([noteTitle.value, noteDetail.value || '']);
	}
	localStorage.data = JSON.stringify(localStorageData);
	loadAlertWindow(true, `${dateValue[0] / 100}년 ${dateValue[1]}월 ${dateValue[2]}일에 할일이 등록 되었습니다.`);
	createNoteRecordsList();
	noteTitle.value = '';
	noteDetail.value = '';
	noteDateInput.value = new Date().toISOString().slice(0, 10);
});
// 태블릿 클릭 이벤트

let tabletPower = false;

const tabletHomeButton = document.getElementById('tablet_home_button');
const tabletScreen = document.getElementById('tablet_screen');
const tabletStatusBar = document.getElementById('tablet_status_bar');
const gameScreen = document.getElementById('tablet_game_screen');
const scoreScreen = document.getElementById('tablet_score_screen');
const tabletWindow = document.getElementById('tablet_window');
let statusMinutes = new Date();

tablet.addEventListener('click', () => {
	backgroundCover.style.display = 'block';

	setTimeout(() => {
		backgroundCover.style.opacity = 1;
	}, 50);
	tabletWindow.style.top = `calc(50% - 300px)`;
	exitTabletButton.style.display = 'block';
	const statusTime = document.getElementById('status_time');
	const date = new Date();
	const timeInfo = `${date.getFullYear() % 100}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
		date.getHours() >= 12 ? '오후' : '오전'
	} ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}시 ${date.getMinutes()}분`;
	statusTime.textContent = timeInfo;
	requestAnimationFrame(updateStatusBarTime);
	const tabletExplanationRight = document.getElementById('tablet_explanation_right');
	tabletExplanationRight.innerHTML =
		'<div id="tablet_explanation_right_text">태블릿의 <strong style="color:red">홈버튼</strong>으로<br/>전원을 <strong style="color:red">켜거나 끌 수</strong> 있습니다.</div>';
	setTimeout(() => {
		tabletExplanationRight.style.opacity = 1;
	}, 1000);
});

exitTabletButton.addEventListener('click', () => {
	const tabletExplanationLeft = document.getElementById('tablet_explanation_left');
	const tabletExplanationRight = document.getElementById('tablet_explanation_right');

	if (tabletPower) {
		// 전원켜져있을 때 나가기

		tabletExplanationLeft.style.opacity = 0;
		tabletExplanationRight.style.opacity = 0;

		setTimeout(() => {
			tabletWindow.style.top = '130%';
			exitTabletButton.style.display = 'none';
			backgroundCover.style.opacity = 0;
			setTimeout(() => {
				backgroundCover.style.display = 'none';
			}, 1000);
		}, 1500);
		tabletScreen.style.opacity = 0;
		tabletScreen.style.filter = `blur(3rem)`;
		tabletStatusBar.style.opacity = 0;
		tabletPower = false;

		gameScreen.classList.remove('game_screen_on');
		scoreScreen.classList.remove('game_screen_on');
		document.getElementById('game_count_cover_button').textContent = '시작하기';
		document.getElementById('game_container').innerHTML = '';

		currentGame = null;
	} else {
		//전원꺼져잇을때 나가기
		tabletExplanationRight.style.opacity = 0;
		setTimeout(() => {
			tabletWindow.style.top = '130%';
			exitTabletButton.style.display = 'none';
			backgroundCover.style.opacity = 0;
			setTimeout(() => {
				backgroundCover.style.display = 'none';
			}, 1000);
		}, 1000);
	}
});

// 태블릿 홈 버튼(화면 on/off)
tabletHomeButton.addEventListener('click', () => {
	const tabletExplanationLeft = document.getElementById('tablet_explanation_left');
	const tabletExplanationRight = document.getElementById('tablet_explanation_right');

	if (!tabletPower) {
		// 태블릿 전원꺼져있을때
		tabletScreen.style.opacity = 1;
		tabletScreen.style.filter = `blur(0)`;
		tabletStatusBar.style.opacity = 1;
		tabletPower = true;
		setTimeout(() => {
			tabletExplanationLeft.style.opacity = 1;
		}, 600);
	} else {
		//전원켜져있을 때

		if (currentGame !== null) {
			//게임중이라면
			tabletExplanationRight.style.opacity = 0;
			setTimeout(() => {
				tabletExplanationRight.innerHTML =
					'<div id="tablet_explanation_right_text">태블릿의 <strong style="color:red">홈버튼</strong>으로<br/>전원을 <strong style="color:red">켜거나 끌 수</strong> 있습니다.</div>';
				tabletExplanationRight.style.opacity = 1;
			}, 1000);
			tabletExplanationLeft.style.opacity = 1;
			gameScreen.classList.remove('game_screen_on');
			scoreScreen.classList.remove('game_screen_on');
			document.getElementById('game_count_cover_button').textContent = '시작하기';
			const gameContainer = document.getElementById('game_container');
			const stageInfo = document.getElementById('stage_info');
			const chanceInfo = document.getElementById('chance_info');

			stageInfo.textContent = '스테이지 :';
			chanceInfo.textContent = '남은 기회 :';
			gameContainer.innerHTML = '';
			const block = document.createElement('div');
			block.classList.add('game_screen_block');
			gameContainer.appendChild(block);

			currentGame = null;

			return;
		}
		//게임중이아니라면
		tabletExplanationLeft.style.opacity = 0;
		tabletScreen.style.opacity = 0;
		tabletScreen.style.filter = `blur(3rem)`;
		tabletStatusBar.style.opacity = 0;
		tabletPower = false;
	}
});

// 아이콘 클릭시 선택된 표시 추가 및 아이콘 드래그, 더블클릭 이벤트

const icons = document.querySelectorAll('.icon_clicked_cover');
const iconsClicked = new Array(icons.length).fill(false);

let currentGame = null;
let cardStage = 1;
let lastCardStage = 1;
let cardGameRecords = localStorage.card ? JSON.parse(localStorage.card) : [];
let orderGameRecords = localStorage.order ? JSON.parse(localStorage.order) : [];
let tictactoeGameRecords = localStorage.tictactoe ? JSON.parse(localStorage.tictactoe) : [];

const cardGameStage = [4, 6, 8, 12, 16, 20, 24];
const cardGameChance = [1, 2, 2, 3, 3, 4, 4];
const cardGameRowNumber = [2, 3, 4, 4, 4, 5, 6];
const cardGameMessage = [
	'1단계도 못 깨는건 쫌...',
	'겨우 1단계...?',
	'2단계라구요...?',
	'흠, 3단계까지네요!',
	'4단계? 좀 하시네요!',
	'5단계요? 제법이시네요!',
	'ㄷㄷ.. 6단계라니 대단하십니다',
	'헉... 이걸 깨다니 대단합니다!',
];

let orderStage = 1;
let lastOrderStage = 1;
const orderGameStage = [2, 3, 3, 3, 4, 4, 5];
const orderGameChance = [1, 1, 2, 2, 3, 3, 4];
const orderGameNumber = [4, 5, 7, 9, 12, 16, 20];
const orderGameMessage = [
	'1단계도 못 깨는건 쫌...',
	'겨우 1단계...?',
	'2단계라구요...?',
	'흠, 3단계까지네요!',
	'4단계? 좀 하시네요!',
	'5단계요? 제법이시네요!',
	'ㄷㄷ.. 6단계라니 대단하십니다',
	'헉... 이걸 깨다니 대단합니다!',
];

icons.forEach((el, idx) => {
	el.parentNode.style.left = 0 + 'px'; // 아이콘 드래그 이벤트
	el.parentNode.style.top = 20 + 110 * idx + 'px';
	el.parentNode.addEventListener('dragstart', e => {
		e.target.classList.add('grabbing');
		e.target.style.background = 'transparent';
	});
	el.parentNode.addEventListener('dragend', e => {
		if (e.clientX > 500 && e.clientX < 1350 && e.clientY > 225 && e.clientY < 780) {
			el.parentNode.style.left = parseInt(el.parentNode.style.left) + (e.offsetX - 45) + 'px';
			el.parentNode.style.top = parseInt(el.parentNode.style.top) + (e.offsetY - 45) + 'px';
		}
		e.target.classList.remove('grabbing');
	});
	el.addEventListener('dblclick', () => {
		//아이콘 더블클릭 이벤트
		const tabletExplanationLeft = document.getElementById('tablet_explanation_left');
		const tabletExplanationRight = document.getElementById('tablet_explanation_right');
		tabletExplanationRight.style.opacity = 0;
		tabletExplanationLeft.style.opacity = 0;
		setTimeout(() => {
			tabletExplanationRight.innerHTML =
				'<div style="padding:0 15px">태블릿의 <strong style="color:red">홈버튼</strong>으로<br/>게임을 <strong style="color:red">끄고</strong> 바탕화면으로 나갈 수 있습니다.</div>';
			tabletExplanationRight.style.opacity = 1;
		}, 1000);
		iconsClicked.forEach((ele, i) => {
			if (ele && idx !== i) {
				icons[i].classList.remove('icon_clicked');
				iconsClicked[i] = false;
			}
		});
		gameScreen.classList.add('game_screen_on');
		scoreScreen.classList.add('game_screen_on');
		const gameContainer = document.getElementById('game_container');
		const tabletPin = document.getElementById('tablet_pin');
		currentGame = el.previousElementSibling.textContent;
		const countCover = document.getElementById('game_count_cover');
		countCover.style.display = 'flex';
		countCover.style.fontSize = '4rem';
		countCover.style.opacity = 1;
		const chanceInfo = document.getElementById('chance_info');
		const stageInfo = document.getElementById('stage_info');

		switch (currentGame) {
			case '카드 맞추기':
				gameContainer.style.backgroundImage = `url('./img/card-background.png')`;
				countCover.style.backgroundImage = `url('./img/card-background.png')`;
				scoreScreen.style.background = 'linear-gradient(-30deg,rgb(248, 184, 8), rgb(245, 216, 136) 50%, rgb(255, 174, 0) 100%)';
				tabletPin.style.backgroundImage = 'url("./img/pin.png")';
				chanceInfo.textContent = '남은 기회 :';
				stageInfo.textContent = '스테이지 :';
				chanceInfo.style.fontSize = '2rem';
				stageInfo.style.fontSize = '2rem';
				break;
			case '순서 맞추기':
				gameContainer.style.backgroundImage = `url('./img/order-background.jpeg')`;
				countCover.style.backgroundImage = `url('./img/order-background.jpeg')`;
				scoreScreen.style.background = 'linear-gradient(-30deg,#279cfc, rgb(177, 228, 252) 50%, #279cfc 100%)';
				tabletPin.style.backgroundImage = 'url("./img/pin2.png")';
				chanceInfo.textContent = '남은 기회 :';
				stageInfo.textContent = '스테이지 :';
				chanceInfo.style.fontSize = '2rem';
				stageInfo.style.fontSize = '2rem';
				break;
			case 'TicTacToe':
				gameContainer.style.backgroundImage = `url('./img/tictactoe-background.jpg')`;
				countCover.style.backgroundImage = `url('./img/tictactoe-background.jpg')`;
				scoreScreen.style.background = 'linear-gradient(-30deg,#63ffa9, rgb(199, 255, 236) 50%, #64ffdd 100%)';
				tabletPin.style.backgroundImage = 'url("./img/pin3.png")';
				stageInfo.textContent = '플레이어 O : 마우스 왼쪽';
				chanceInfo.textContent = '플레이어 X : 마우스 오른쪽';
				chanceInfo.style.fontSize = '1.3rem';
				stageInfo.style.fontSize = '1.3rem';

				break;
			default:
				break;
		}
		createRecordList(currentGame);
	});
	el.addEventListener('click', e => {
		// 아이콘 클릭 이벤트
		iconsClicked.forEach((ele, i) => {
			if (ele && idx !== i) {
				icons[i].classList.remove('icon_clicked');
				iconsClicked[i] = false;
			}
		});
		e.stopPropagation();
		if (!iconsClicked[idx]) {
			el.classList.add('icon_clicked');
		} else {
			el.classList.remove('icon_clicked');
		}
		iconsClicked[idx] = !iconsClicked[idx];
	});
});

// const cardGameStage = [4, 6, 8, 12, 16, 20, 24];
// const cardGameChance = [1, 2, 2, 3, 3, 4, 4];
const countCover = document.getElementById('game_count_cover');
const countCoverButton = document.getElementById('game_count_cover_button');
const enrollCover = document.getElementById('enroll_cover');
const enrollButton = document.getElementById('enroll_button');
countCoverButton.addEventListener('click', e => {
	switch (currentGame) {
		case '카드 맞추기':
			gameStartEffect();
			createCardGame(cardStage);
			break;
		case '순서 맞추기':
			gameStartEffect();
			createOrderGame(orderStage);
			break;
		case 'TicTacToe':
			countCover.style.opacity = 0;
			setTimeout(() => {
				countCover.style.display = 'none';
			}, 500);
			createTictactoGame();
			break;
	}
});

enrollButton.addEventListener('click', e => {
	const name = document.getElementById('enroll');
	const enrollWindow = document.getElementById('enroll_window');

	e.preventDefault();
	switch (currentGame) {
		case '카드 맞추기':
			cardGameRecords.push([name.value ? name.value : 'Player', lastCardStage]);
			localStorage.card = JSON.stringify(cardGameRecords);
			break;
		case '순서 맞추기':
			orderGameRecords.push([name.value ? name.value : 'Player', lastCardStage]);
			localStorage.order = JSON.stringify(orderGameRecords);
			break;
	}
	name.value = '';
	createRecordList(currentGame);
	enrollWindow.style.transform = 'translateY(-600px)';
	enrollCover.style.opacity = 0;
	setTimeout(() => {
		enrollCover.style.display = 'none';
	}, 1000);
});

function createRecordList(game) {
	let records;
	switch (game) {
		case '카드 맞추기':
			records = cardGameRecords;
			break;
		case '순서 맞추기':
			records = orderGameRecords;
			break;
		case 'TicTacToe':
			records = tictactoeGameRecords;
			break;
		default:
			break;
	}
	const recordList = document.getElementById('record_list');
	recordList.innerHTML = '';
	if (game === 'TicTacToe') {
		records.forEach(el => {
			let list = document.createElement('div');
			list.classList.add('record_list');
			list.textContent = el;
			recordList.appendChild(list);
			return;
		});
	} else {
		records.forEach(el => {
			let list = document.createElement('div');
			list.classList.add('record_list');
			let name = document.createElement('div');
			name.textContent = el[0].length > 8 ? el[0].slice(0, 8) + '...' : el[0];
			let score = document.createElement('div');
			score.textContent = el[1] + '단계';
			list.appendChild(score);
			list.appendChild(name);

			recordList.appendChild(list);
		});
	}
}
const tictactoeCover = document.getElementById('tictactoe_cover');
const tictactoeWindow = document.getElementById('tictactoe_window');

tictactoeCover.addEventListener('contextmenu', e => {
	e.preventDefault();
});
document.getElementById('tictactoe_button').addEventListener('click', () => {
	tictactoeCover.style.opacity = 0;
	tictactoeWindow.style.transform = 'translateY(-600px)';

	setTimeout(() => {
		tictactoeCover.style.display = 'none';
	}, 500);
	createTictactoGame();
});

function createTictactoGame() {
	const gameContainer = document.getElementById('game_container');
	gameContainer.innerHTML = '';
	const block = document.createElement('div');
	block.classList.add('game_screen_block');

	gameContainer.appendChild(block);
	const stageInfo = document.getElementById('stage_info');
	const chanceInfo = document.getElementById('chance_info');

	stageInfo.textContent = '플레이어 O : 마우스 왼쪽';
	chanceInfo.textContent = '플레이어 X : 마우스 오른쪽';
	stageInfo.style.fontSize = '1.3rem';
	chanceInfo.style.fontSize = '1.3rem';
	let left = [];
	let right = [];
	for (let i = 0; i < 3; i++) {
		const row = document.createElement('div');
		row.classList.add('tictactoe_row');
		for (let j = 0; j < 3; j++) {
			const borderValue = '3px solid rgb(14 175 0)';
			const box = document.createElement('div');
			const idx = i * 3 + j;
			box.addEventListener('mousedown', e => {
				let isRightButton;
				if ('which' in e)
					// Gecko (Firefox), WebKit (Safari/Chrome) & Opera
					isRightButton = e.which == 3;
				else if ('button' in e)
					// IE, Opera
					isRightButton = e.button == 2;

				const div = document.createElement('div');

				if (!isRightButton) {
					if (left.length + 1 - right.length === 2) return;
					if (left.includes[idx] || right.includes[idx]) return;
					left.push(idx);
					div.classList.add('tictactoe_o');
					e.target.appendChild(div);
				} else {
					if (right.length + 1 - left.length === 2) return;
					if (left.includes[idx] || right.includes[idx]) return;
					right.push(idx);
					div.classList.add('tictactoe_x');
					e.target.appendChild(div);
				}
				let answer = checkTictactoe(left, right);
				const tictactoeCover = document.getElementById('tictactoe_cover');
				const tictactoeWindow = document.getElementById('tictactoe_window');
				const tictactoeWinner = document.getElementById('tictactoe_winner');

				if (answer) {
					tictactoeCover.style.display = 'flex';
					setTimeout(() => {
						tictactoeCover.style.opacity = 1;
						tictactoeWindow.style.transform = 'translateY(0)';
					}, 50);
					if (answer === 'left') {
						tictactoeWinner.innerHTML = '플레이어 <span id="player_o">O</span> 승리!';
						tictactoeGameRecords.push('플레이어 O 승리');
					} else {
						tictactoeWinner.innerHTML = '플레이어 <span id="player_x">X</span> 승리!';
						tictactoeGameRecords.push('플레이어 X 승리');
					}

					localStorage.tictactoe = JSON.stringify(tictactoeGameRecords);
					createRecordList(currentGame);
				}
				if (left.length + right.length === 9 && !answer) {
					tictactoeCover.style.display = 'flex';
					setTimeout(() => {
						tictactoeCover.style.opacity = 1;
						tictactoeWindow.style.transform = 'translateY(0)';
					}, 50);
					tictactoeWinner.textContent = '무승부네요';
					tictactoeGameRecords.push('무승부');
					localStorage.tictactoe = JSON.stringify(tictactoeGameRecords);
					createRecordList(currentGame);
				}
			});
			box.addEventListener('contextmenu', e => {
				e.preventDefault();
			});
			box.classList.add('tictactoe_box');
			if (idx % 3 === 0) {
				box.style.borderRight = borderValue;
			} else if (idx % 3 === 1) {
				box.style.borderLeft = borderValue;
				box.style.borderRight = borderValue;
			} else {
				box.style.borderLeft = borderValue;
			}
			if (Math.floor(idx / 3) === 0) {
				box.style.borderBottom = borderValue;
			} else if (Math.floor(idx / 3) === 1) {
				box.style.borderTop = borderValue;
				box.style.borderBottom = borderValue;
			} else {
				box.style.borderTop = borderValue;
			}
			row.appendChild(box);
		}
		gameContainer.appendChild(row);
	}
}
const tictactoeAnswer = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function checkTictactoe(left, right) {
	for (let i = 0; i < tictactoeAnswer.length; i++) {
		if (left.includes(tictactoeAnswer[i][0]) && left.includes(tictactoeAnswer[i][1]) && left.includes(tictactoeAnswer[i][2]))
			return 'left';
		if (right.includes(tictactoeAnswer[i][0]) && right.includes(tictactoeAnswer[i][1]) && right.includes(tictactoeAnswer[i][2]))
			return 'right';
	}
	return false;
}
// const orderGameStage = [2, 3, 3, 3, 4, 4, 5];
// const orderGameChance = [1, 1, 2, 2, 3, 3, 4];
// const orderGameNumber = [4, 5, 7, 9, 12, 16, 20];
function createOrderGame(stage) {
	let chance = orderGameChance[stage - 1];

	const stageNumber = orderGameStage[stage - 1];
	const gameContainer = document.getElementById('game_container');
	const answerArray = createOrderArray(stage);
	const stageInfo = document.getElementById('stage_info');
	const chanceInfo = document.getElementById('chance_info');
	const enrollWindow = document.getElementById('enroll_window');
	const lastStageInfo = document.getElementById('last_stage_info');
	const enrollCover = document.getElementById('enroll_cover');
	let userInput = [];

	stageInfo.textContent = `스테이지 : ${stage}단계`;
	chanceInfo.textContent = `남은 기회 : ${chance}번`;

	for (let i = 0; i < stageNumber; i++) {
		const row = document.createElement('div');
		row.style.height = 90 / stageNumber + '%';
		row.classList.add('order_row');
		for (let j = 0; j < stageNumber; j++) {
			const div = document.createElement('div');
			div.style.width = 90 / stageNumber + '%';
			div.classList.add('order_box');
			div.addEventListener('click', () => {
				userInput.push(stageNumber * i + j);
				if (userInput[userInput.length - 1] === answerArray[userInput.length - 1]) {
					div.classList.add('order_box_clicked');
					if (userInput.length === answerArray.length) {
						countCover.style.display = 'flex';
						countCover.children[0].style.fontSize = '4rem';
						countCover.children[0].textContent = '다음 단계로';
						gameContainer.innerHTML = '';
						const block = document.createElement('div');
						block.classList.add('game_screen_block');
						gameContainer.appendChild(block);
						if (orderStage === 7) {
							countCover.children[0].textContent = '처음부터 다시하기';
							lastStageInfo.textContent = orderGameMessage[orderStage];
							orderStage = 1;
							setTimeout(() => {
								countCover.style.opacity = 1;
								enrollCover.style.display = 'flex';
								document.getElementById('enroll').focus();
								setTimeout(() => {
									enrollCover.style.opacity = 1;
									enrollWindow.style.transform = 'translateY(0)';
								}, 500);
							}, 10);
						}

						orderStage += 1;
						setTimeout(() => {
							countCover.style.opacity = 1;
						}, 50);
					}
				} else {
					chance--;
					div.classList.add('order_box_wrong');
					const transparentCover = document.getElementById('game_transparent_cover');
					transparentCover.style.display = 'block';
					setTimeout(() => {
						div.classList.remove('order_box_wrong');
						transparentCover.style.display = 'none';
					}, 1200);
					chanceInfo.textContent = `남은 기회 : ${chance}번`;
					if (chance === 0) {
						lastOrderStage = orderStage - 1;
						countCover.style.display = 'flex';
						countCover.children[0].style.fontSize = '4rem';
						countCover.children[0].textContent = '처음부터 다시하기';
						gameContainer.innerHTML = '';
						const block = document.createElement('div');
						block.classList.add('.game_screen_block');
						gameContainer.appendChild(block);
						lastStageInfo.textContent = orderGameMessage[lastCardStage];
						cardStage = 1;
						setTimeout(() => {
							countCover.style.opacity = 1;
							enrollCover.style.display = 'flex';
							document.getElementById('enroll').focus();

							setTimeout(() => {
								enrollCover.style.opacity = 1;
								enrollWindow.style.transform = 'translateY(0)';
							}, 500);
						}, 10);
					}
				}
			});
			row.appendChild(div);
		}
		gameContainer.appendChild(row);
	}
	setTimeout(() => {
		showOrder(answerArray);
	}, 3700);
}

function createOrderArray(stage) {
	const arr = [];
	for (let i = 0; i < orderGameNumber[stage - 1]; i++) {
		arr.push(Math.floor(Math.random() * Math.pow(orderGameStage[stage - 1], 2)));
	}
	return arr;
}

function showOrder(answerArray) {
	const boxes = document.querySelectorAll('.order_box');
	const transparentCover = document.getElementById('game_transparent_cover');
	transparentCover.style.display = 'block';
	answerArray.forEach((el, idx) => {
		setTimeout(() => {
			boxes[el].classList.add('order_box_show');
			setTimeout(() => {
				boxes[el].classList.remove('order_box_show');
				if (answerArray.length - 1 === idx) {
					transparentCover.style.display = 'none';
				}
			}, 500);
		}, idx * 1000);
	});
}

function createCardGame(stage) {
	let chance = cardGameChance[stage - 1];
	let answerCount = cardGameStage[stage - 1] / 2;
	const cardNumber = cardGameStage[stage - 1];
	const rowNum = cardGameRowNumber[stage - 1];
	const gameContainer = document.getElementById('game_container');
	const imageList = createRandomImageArray(cardNumber);
	const answerPair = createRandomPair(cardNumber).map(el => el.sort((a, b) => a - b));
	const cardOrder = createRandomCardOrder(cardNumber);
	const stageInfo = document.getElementById('stage_info');
	const chanceInfo = document.getElementById('chance_info');
	const enrollWindow = document.getElementById('enroll_window');
	const lastStageInfo = document.getElementById('last_stage_info');
	const enrollCover = document.getElementById('enroll_cover');

	stageInfo.textContent = `스테이지 : ${stage}단계`;
	chanceInfo.textContent = `남은 기회 : ${chance}번`;

	let userInput = [];

	for (let i = 0; i < rowNum; i++) {
		const row = document.createElement('div');
		row.classList.add('card_row');
		row.style.height = `${90 / rowNum}%`;
		for (let j = 0; j < cardNumber / rowNum; j++) {
			const cardContainer = document.createElement('div');
			const idx = (i * cardNumber) / rowNum + j;
			cardContainer.classList.add('card_container');
			cardContainer.style.width = `${93 / (cardNumber / rowNum)}%`;
			const card = document.createElement('div');
			card.classList.add('card');

			const cardFront = document.createElement('div');
			const cardBack = document.createElement('div');
			cardFront.classList.add('card_front');
			cardBack.classList.add('card_back');

			const cardBackImage = document.createElement('div');
			cardBackImage.classList.add('card_back_image');

			cardBack.appendChild(cardBackImage);
			card.appendChild(cardFront);
			card.appendChild(cardBack);
			cardFront.onclick = e => {
				card.style.transform = 'rotateY(180deg)';
				userInput.push(idx);
				if (userInput.length === 2) {
					const cards = document.querySelectorAll('.card');
					if (checkAnswer(userInput, answerPair)) {
						userInput.forEach(el => {
							cards[el].children[1].classList.add('card_back_right_animation');
							cards[el].parentNode.classList.add('card_back_right');
						});
						answerCount--;
						if (answerCount === 0) {
							countCover.style.display = 'flex';
							countCover.children[0].style.fontSize = '4rem';
							countCover.children[0].textContent = '다음 단계로';
							gameContainer.innerHTML = '';
							const block = document.createElement('div');
							block.classList.add('.game_screen_block');
							gameContainer.appendChild(block);
							if (cardStage === 7) {
								countCover.children[0].textContent = '처음부터 다시하기';
								lastStageInfo.textContent = cardGameMessage[cardStage - 1];
								cardStage = 1;
								setTimeout(() => {
									countCover.style.opacity = 1;
									enrollCover.style.display = 'flex';
									document.getElementById('enroll').focus();
									setTimeout(() => {
										enrollCover.style.opacity = 1;
										enrollWindow.style.transform = 'translateY(0)';
									}, 500);
								}, 10);
							}

							cardStage += 1;
							setTimeout(() => {
								countCover.style.opacity = 1;
							}, 50);
						}
					} else {
						(function (userInput) {
							setTimeout(() => {
								userInput.forEach(el => {
									cards[el].children[1].classList.add('card_back_wrong');
									setTimeout(() => {
										cards[el].children[1].classList.remove('card_back_wrong');
										cards[el].style.transform = 'rotateY(0)';
									}, 1200);
								});
								chance--;
								chanceInfo.textContent = `남은 기회 : ${chance}번`;

								if (chance === 0) {
									lastCardStage = cardStage - 1;
									countCover.style.display = 'flex';
									countCover.children[0].style.fontSize = '4rem';
									countCover.children[0].textContent = '처음부터 다시하기';
									gameContainer.innerHTML = '';
									const block = document.createElement('div');
									block.classList.add('.game_screen_block');
									gameContainer.appendChild(block);
									lastStageInfo.textContent = cardGameMessage[lastCardStage];
									cardStage = 1;
									setTimeout(() => {
										countCover.style.opacity = 1;
										enrollCover.style.display = 'flex';
										document.getElementById('enroll').focus();

										setTimeout(() => {
											enrollCover.style.opacity = 1;
											enrollWindow.style.transform = 'translateY(0)';
										}, 500);
									}, 10);
								}
							}, 500);
						})([...userInput]);
					}
					userInput = [];
				}
			};
			cardContainer.appendChild(card);
			row.appendChild(cardContainer);
		}
		gameContainer.appendChild(row);
	}
	setTimeout(() => {
		showAllCards(cardOrder);
	}, 3700);

	answerPair.forEach((el, idx) => {
		const backImages = document.querySelectorAll('.card_back_image');
		const height = backImages[0].parentNode.offsetHeight * 0.7;
		el.forEach(num => {
			backImages[num].style.width = height + 'px';
			backImages[num].style.height = height + 'px';
			backImages[num].style.backgroundImage = `url(${imageList[idx]})`;
		});
	});
}
// 태블릿 바탕화면 클릭하면 아이콘 클릭 해제
tabletScreen.addEventListener('click', () => {
	icons.forEach((el, idx) => {
		el.classList.remove('icon_clicked');
		iconsClicked[idx] = false;
	});
});

function showAllCards(order) {
	const cards = document.querySelectorAll('.card');
	const transparentCover = document.getElementById('game_transparent_cover');
	transparentCover.style.display = 'block';
	for (let i = 0; i < order.length; i++) {
		setTimeout(() => {
			cards[order[i]].style.transform = 'rotateY(180deg)';
			setTimeout(() => {
				cards[order[i]].style.transform = 'rotateY(0)';
				if (i === order.length - 1) transparentCover.style.display = 'none';
			}, 500);
		}, 500 + i * 1000);
	}
}
// 500 1500 2500 3500
// 1000 2000 3000 4000
function checkAnswer(userInput, answerPair) {
	const userInputString = userInput.sort((a, b) => a - b).join('');
	const answerPairString = answerPair.map(el => el.join(''));
	return answerPairString.includes(userInputString) ? true : false;
}

function createRandomCardOrder(cardNumber) {
	const arr = [];
	while (arr.length !== cardNumber) {
		const randNum = Math.floor(Math.random() * cardNumber);
		if (arr.includes(randNum)) continue;
		arr.push(randNum);
	}

	return arr;
}

function updateStatusBarTime() {
	if (statusMinutes.getMinutes() !== new Date().getMinutes()) {
		const statusTime = document.getElementById('status_time');
		const date = new Date();
		const timeInfo = `${date.getFullYear() % 100}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
			date.getHours() >= 12 ? '오후' : '오전'
		} ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}시 ${date.getMinutes()}분`;
		statusTime.textContent = timeInfo;
		requestAnimationFrame(updateStatusBarTime);
	}
}

function createRandomImageArray(cardNumber) {
	const arr = [];
	while (arr.length !== cardNumber / 2) {
		const randNum = Math.floor(Math.random() * 27);
		if (arr.includes(randNum)) continue;
		arr.push(randNum);
	}
	return arr.map(el => `./img/animal${el}.png`);
}

function createRandomPair(cardNumber) {
	const arr = new Array(cardNumber).fill(0).map((el, idx) => idx);
	const res = [];
	for (let i = 0; i < cardNumber / 2; i++) {
		const temp = [];
		for (let j = 0; j < 2; j++) {
			const randNum = Math.floor(Math.random() * arr.length);
			temp.push(arr.splice(randNum, 1)[0]);
		}
		res.push(temp);
	}
	return res;
}

function gameStartEffect(string) {
	const transparentCover = document.getElementById('game_transparent_cover');
	transparentCover.style.display = 'block';
	setTimeout(() => {
		transparentCover.style.display = 'none';
	}, 3500);
	const countCover = document.getElementById('game_count_cover');
	const homeButtonCover = document.getElementById('tablet_home_button_cover');
	homeButtonCover.style.display = 'block';
	// countCover.style.display = 'none';
	if (string) {
		countCover.children[0].textContent = string;
	}
	countCover.children[0].style.fontSize = '4rem';
	let count = 3;
	while (count !== 0) {
		(function (x) {
			setTimeout(() => {
				countCover.children[0].classList.add('game_count_blur');
				setTimeout(() => {
					countCover.children[0].style.fontSize = '14rem';
					countCover.children[0].classList.remove('game_count_blur');
					countCover.children[0].textContent = x;
				}, 400);
			}, 400 + (3 - x) * 800);
		})(count);
		count--;
	}
	setTimeout(() => {
		countCover.style.opacity = 0;
		setTimeout(() => {
			countCover.children[0].style.fontSize = '4rem';
			countCover.style.display = 'none';
			homeButtonCover.style.display = 'none';
		}, 500);
	}, 2800);
}
// }       0    500      1000          1500    200
//시작하기 - 블러 - 블러꺼지면서 3 - 블러 - 블러꺼지면서 2 -블러 - 블러꺼지면서 1 - 커버 사라짐
// 달력 클릭 이벤트
const calendarWindow = document.getElementById('calendar_window');
calendar.addEventListener('click', () => {
	backgroundCover.style.display = 'block';
	setTimeout(() => {
		backgroundCover.style.opacity = 1;
	}, 50);
	calendarWindow.style.top = `calc(50% - 250px)`;
	exitCalendarButton.style.display = 'block';
	createTodoList(currentDate.toISOString().slice(0, 10));
	createCalendar(currentDate);
});

exitCalendarButton.addEventListener('click', () => {
	calendarWindow.style.top = '130%';
	exitCalendarButton.style.display = 'none';
	backgroundCover.style.opacity = 0;
	setTimeout(() => {
		backgroundCover.style.display = 'none';
	}, 900);
});

let currentDate = new Date();

const monthValue = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayValue = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()];
let chosenDate = [...today];
let localStorageData = localStorage.data ? JSON.parse(localStorage.data) : {};

createCalendar(currentDate);
const postButton = document.getElementById('calendar_post_button');
const pastButton = document.getElementById('calendar_past_button');
const todoInputButton = document.getElementById('todo_submit_button');
const todoTextInput = document.getElementById('todo_input');

todoInputButton.addEventListener('click', () => {
	saveTodoInLocalStorage(today, chosenDate, todoTextInput.value);
	createCalendar(currentDate);
});
todoTextInput.addEventListener('keypress', e => {
	if (e.key === 'Enter') {
		saveTodoInLocalStorage(today, chosenDate, todoTextInput.value);
		createCalendar(currentDate);
	}
});

alertConfirm.addEventListener('click', alertWindowOff);

postButton.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() + 1);
	createCalendar(currentDate);
});
pastButton.addEventListener('click', () => {
	currentDate.setMonth(currentDate.getMonth() - 1);
	createCalendar(currentDate);
});

const todayButton = document.getElementById('calendar_today_button');
todayButton.addEventListener('click', () => {
	currentDate = new Date();
	createCalendar(currentDate);
});
if (!localStorage['data']) {
	localStorage.setItem('data', JSON.stringify({}));
}

function createCalendar(date) {
	const copyDate = new Date(date);
	const calendarMonth = document.getElementById('calendar_month');
	const calendarYear = document.getElementById('calendar_year');
	const calendarContainer = document.getElementById('calendar_container');
	const calendarDetailDate = document.getElementById('calendar_detail_date');
	const calendarDetailDay = document.getElementById('calendar_detail_day');

	calendarMonth.textContent = monthValue[date.getMonth()];
	calendarYear.textContent = date.getFullYear();

	copyDate.setDate(1);

	const rowLength = Math.ceil((getMonthLength(copyDate) + copyDate.getDay()) / 7);
	let dateInfo = new Array(getMonthLength(copyDate)).fill(0).map((el, idx) => idx + 1);
	dateInfo = getPastMonthDays(copyDate).concat(dateInfo);
	dateInfo = dateInfo.concat(new Array(rowLength * 7 - dateInfo.length).fill(0).map((el, idx) => idx + 1));
	copyDate.setDate(currentDate.getDate());
	calendarDetailDate.textContent = copyDate.getDate();
	calendarDetailDay.textContent = dayValue[copyDate.getDay()];
	let dateString = copyDate.toISOString().slice(0, 10);
	if (localStorageData[dateString] && localStorageData[dateString].length !== 0) {
		createTodoList(dateString);
	} else {
		createTodoList();
	}
	let currentMonthInfo = `${currentDate.getFullYear()}.${currentDate.getMonth() + 1}`;
	calendarContainer.innerHTML = '';

	for (let i = 0; i < rowLength; i++) {
		const dates = dateInfo.splice(0, 7);
		const row = document.createElement('div');
		row.classList.add('calendar_row');
		row.style.height = `${90 / rowLength}%`;
		for (let j = 0; j < 7; j++) {
			const date = document.createElement('div');
			date.classList.add('calendar_date');
			if (j === 0) {
				date.classList.add('sun');
			}
			if (j === 6) {
				date.classList.add('sat');
			}
			if (i === 0 && dates[j] > 10) {
				date.classList.add('past');
			} else if (i === rowLength - 1 && dates[j] < 10) {
				date.classList.add('post');
			} else {
				date.classList.add('current');
			}
			date.textContent = dates[j];

			row.appendChild(date);
		}
		calendarContainer.appendChild(row);
	}
	let postDays = document.querySelectorAll('.post');
	let pastDays = document.querySelectorAll('.past');
	let currentDays = document.querySelectorAll('.current');
	let clickedDay = null;
	if (date.getFullYear() === today[0] && date.getMonth() === today[1] - 1) {
		Array.from(currentDays)
			.filter(el => el.textContent == today[2])[0]
			.classList.add('today');
	}

	postDays.forEach(el => {
		el.addEventListener('click', () => {
			date.setMonth(date.getMonth() + 1);
			createCalendar(date);
		});
	});

	pastDays.forEach(el => {
		el.addEventListener('click', () => {
			date.setMonth(date.getMonth() - 1);
			createCalendar(date);
		});
	});
	let currentDateString = currentDate.toISOString().slice(0, 7);
	currentDays.forEach(el => {
		let thisDateInfo = `${currentDateString}-${Number(el.textContent) < 10 ? '0' + el.textContent : el.textContent}`;
		if (localStorageData[thisDateInfo] && localStorageData[thisDateInfo].length !== 0) {
			const point = document.createElement('div');
			point.classList.add('todo');
			el.appendChild(point);
		}
		el.addEventListener('click', () => {
			if (clickedDay) {
				clickedDay.classList.remove('calendar_clicked');
			}
			clickedDay = el;
			el.classList.add('calendar_clicked');
			calendarDetailDate.textContent = el.textContent;
			date.setDate(el.textContent);
			calendarDetailDay.textContent = dayValue[date.getDay()];
			chosenDate = [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()];
			let dateInfo = chosenDate.map(el => (el < 10 ? '0' + el : el.toString())).join('-');
			if (localStorageData[dateInfo] && localStorageData[dateInfo].length !== 0) {
				createTodoList(dateInfo);
			} else {
				createTodoList();
			}
		});
	});
}

function createTodoList(dataInfo) {
	const todoContainer = document.getElementById('calendar_todo_lists');
	todoContainer.innerHTML = '';
	if (!dataInfo || !localStorageData[dataInfo]) {
		todoContainer.textContent = '할 일을 입력해주세요';
		return;
	}

	const todos = localStorageData[dataInfo];
	todos.forEach((el, idx) => {
		const todo = document.createElement('div');

		todo.classList.add('calendar_todo');

		const todoText = document.createElement('div');
		todoText.classList.add('calendar_todo_text');
		todoText.textContent = el[0].length > 15 ? '⚬ ' + el[0].slice(0, 15) + '...' : '⚬ ' + el[0];

		const todoDeleteButton = document.createElement('div');
		todoDeleteButton.todoIndex = idx;
		todoDeleteButton.classList.add('calendar_todo_delete');

		todoDeleteButton.addEventListener('click', () => {
			const dateInfo = currentDate.toISOString().slice(0, 10);
			localStorageData[dateInfo].splice(todoDeleteButton.todoIndex, 1);
			localStorage.data = JSON.stringify(localStorageData);
			if (localStorageData[dateInfo].length === 0) {
				createCalendar(currentDate);
				return;
			}
			createTodoList(dateInfo);
		});

		todo.appendChild(todoText);
		todo.appendChild(todoDeleteButton);

		todoContainer.appendChild(todo);
	});
}

function saveTodoInLocalStorage(today, chosenDate, data) {
	const dateInfo = chosenDate.map(el => (el < 10 ? '0' + el : el.toString())).join('-');
	if (new Date(today).valueOf() <= new Date(chosenDate).valueOf()) {
		if (data.trim().length === 0) {
			loadAlertWindow(false, '내용을 입력해주세요');
			return;
		}
		loadAlertWindow(true, `${chosenDate[0] % 100}년 ${chosenDate[1]}월 ${chosenDate[2]}일에 할일이 등록 되었습니다.`);

		localStorageData = JSON.parse(localStorage.data);
		if (!localStorageData[dateInfo]) {
			localStorageData[dateInfo] = [];
		}
		localStorageData[dateInfo].push([data, '']);
		localStorage.data = JSON.stringify(localStorageData);
	} else {
		loadAlertWindow(false, '이미 지난 날엔 계획을 세울 수 없습니다');
	}
}

function alertWindowOff() {
	document.getElementById('alert_window').classList.remove('alert_window_on');
	document.getElementById('todo_input').value = '';
	const alertCover = document.getElementById('alert_cover');
	alertCover.style.opacity = 0;
	setTimeout(() => {
		alertCover.style.display = 'none';
	}, 500);
}

function loadAlertWindow(result, msg) {
	const alertCover = document.getElementById('alert_cover');
	const alertWindow = document.getElementById('alert_window');
	const alertImage = document.getElementById('alert_image');
	const alertMessage = document.getElementById('alert_message');
	const alertDetail = document.getElementById('alert_detail');
	const alertConfirm = document.getElementById('alert_confirm');

	alertCover.style.display = 'block';
	if (result) {
		alertImage.style.backgroundImage = `url('./img/success.png')`;
		alertMessage.textContent = '등록 성공';
		alertMessage.style.color = '#527aff';
		alertDetail.textContent = msg;
		alertConfirm.style.color = '#527aff';
		alertConfirm.style.border = '2px solid #527aff';
	} else {
		alertImage.style.backgroundImage = `url('./img/alert.png')`;
		alertMessage.textContent = '등록 실패';
		alertMessage.style.color = '#ff7300';
		alertDetail.textContent = msg;
		alertConfirm.style.color = '#ff7300';
		alertConfirm.style.border = '2px solid #ff7300';
	}
	setTimeout(() => {
		alertCover.style.opacity = 1;
		alertWindow.classList.add('alert_window_on');
	}, 50);
}

function getPastMonthDays(date) {
	let tempDate = new Date(date);
	let num = tempDate.getDay();
	tempDate.setDate(tempDate.getDate() - num - 1);
	let res = [];
	for (let i = 0; i < num; i++) {
		tempDate.setDate(tempDate.getDate() + 1);
		res.push(tempDate.getDate());
	}
	return res;
}

function getMonthLength(date) {
	let last = new Date(date);
	last.setMonth(last.getMonth() + 1);
	last.setDate(0);
	return last.getDate();
}

// 시계 클릭 이벤트
{
	const clockWindow = document.getElementById('clock_window');
	clock.addEventListener('click', () => {
		backgroundCover.style.display = 'block';
		setTimeout(() => {
			backgroundCover.style.opacity = 1;
		}, 50);
		clockWindow.style.top = `calc(50% - 100px)`;
		createClock();
		exitClockButton.style.display = 'block';
	});
	exitClockButton.addEventListener('click', () => {
		clockWindow.style.top = '130%';
		exitClockButton.style.display = 'none';
		backgroundCover.style.opacity = 0;
		setTimeout(() => {
			backgroundCover.style.display = 'none';
		}, 900);
		clearInterval(clockInterval);
	});
	let clockInterval = null;
	createClock();

	function createClock() {
		const spaces = document.querySelectorAll('.space');
		const date = new Date();
		let hour = (date.getUTCHours() + 9) % 24;
		let min = date.getUTCMinutes();
		let second = date.getUTCSeconds();
		let moved = new Array(6).fill(false);

		let clockValue = [
			hour >= 10 ? Math.floor(hour / 10) : 0,
			hour % 10,
			Math.floor(min / 10),
			min % 10,
			Math.floor(second / 10),
			Math.floor(second % 10),
		];
		const rotateDegree = new Array(6).fill(0);
		const clockNumbers = document.querySelectorAll('.clock_number');
		clockNumbers.forEach((el, idx) => {
			el.textContent = clockValue[idx];
		});

		// clockInterval = setInterval(() => {
		//     clockValue[5] += 1;
		//     moved[5] = true;
		//     if (clockValue[5] === 10) {
		//         clockValue[5] = 0;
		//         clockValue[4] += 1;
		//         moved[4] = true;
		//         if (clockValue[4] > 5) {
		//             clockValue[4] = 0;
		//             clockValue[3] += 1;
		//             moved[3] = true;
		//             if (clockValue[3] === 10) {
		//                 clockValue[3] = 0;
		//                 clockValue[2] += 1;
		//                 moved[2] = true;
		//                 if (clockValue[2] > 5) {
		//                     clockValue[2] = 0;
		//                     clockValue[1] += 1;
		//                     moved[1] = true;
		//                     if (clockValue[0] < 2 && clockValue[1] === 10) {
		//                         clockValue[1] = 0;
		//                         clockValue[0] += 1;
		//                         moved[0] = true;
		//                     } else if (clockValue[0] === 2 && clockValue[1] === 4) {
		//                         clockValue[1] = 0;
		//                         clockValue[0] = 0;
		//                     }
		//                 }
		//             }
		//         }
		//     }
		//     clockNumbers.forEach((el, idx) => {
		//         if (moved[idx]) {
		//             rotateDegree[idx] += 360;
		//             el.style.transform = `rotateX(${rotateDegree[idx]}deg)`;
		//         }
		//         setTimeout(() => {
		//             el.textContent = clockValue[idx];
		//         }, 500)
		//     })
		//     moved = moved.map(el => false);
		// }, 1000)
		let currentSecond = new Date().getSeconds();
		let clocks = [];

		function clockWorking() {
			if (currentSecond !== new Date().getSeconds()) {
				let hours = new Date().getHours().toString();
				if (hours.length === 1) hours = '0' + hours;
				hours.split('').forEach(el => clocks.push(el));
				let minutes = new Date().getMinutes().toString();
				if (minutes.length === 1) minutes = '0' + minutes;
				minutes.split('').forEach(el => clocks.push(el));
				let seconds = new Date().getSeconds().toString();
				if (seconds.length === 1) seconds = '0' + seconds;
				seconds.split('').forEach(el => clocks.push(el));
				clockNumbers.forEach((el, idx) => {
					el.textContent = clocks[idx];
				});
				clocks = [];
			}

			requestAnimationFrame(clockWorking);
		}
		requestAnimationFrame(clockWorking);
	}
}
