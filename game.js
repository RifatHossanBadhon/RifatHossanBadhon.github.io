
document.addEventListener('DOMContentLoaded', function () {
    const gameArea = document.getElementById('gameArea');
    let currentStage = 0;

    const stages = [
        {
            title: "Stage 1: Password Guess",
            content: `
                <p class="text">Hint: The password is a common default password (5 characters)</p>
                <div class="input-area">
                    <input type="text" id="stage1Input" placeholder="Enter password..."/>
                    <button>Submit</button>
                </div>
            `,
            validate: function () {
                const input = document.getElementById('stage1Input').value.trim().toLowerCase();
                return input === "admin";
            }
        },
        {
            title: "Stage 2: Base64 Decoder",
            content: `
                <p class="text">Hint: Decode this Base64 string: <code>c2VjdXJpdHk=</code></p>
                <div class="input-area">
                    <input type="text" id="stage2Input" placeholder="Decoded text..."/>
                    <button>Submit</button>
                </div>
            `,
            validate: function () {
                const input = document.getElementById('stage2Input').value.trim().toLowerCase();
                return input === "security";
            }
        },
        {
            title: "Stage 3: Caesar Cipher",
            content: `
                <p class="text">Hint: Decrypt this Caesar cipher (shift 3): <code>vhfxulwb</code></p>
                <div class="input-area">
                    <input type="text" id="stage3Input" placeholder="Decrypted text..."/>
                    <button>Submit</button>
                </div>
            `,
            validate: function () {
                const input = document.getElementById('stage3Input').value.trim().toLowerCase();
                return input === "security";
            }
        },
        {
            title: "Challenge Completed!",
            content: `
                <p>Well Done, You have completed all the stages</p>
                <canvas id="matrix-canvas" 
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
                </canvas>
            `
        }
    ];

    function matrixAnimation() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(draw, 33);
    }

    function loadStage(stageIndex) {
        const stage = stages[stageIndex];
        if (stage) {
            gameArea.innerHTML = `<h3>${stage.title}</h3> ${stage.content}`;
            if (stageIndex === 3) {
                gameArea.style.position = 'relative';
                gameArea.style.display = 'flex';
                gameArea.style.flexDirection = 'column';
                gameArea.style.justifyContent = 'center';
                gameArea.style.alignItems = 'center';
                matrixAnimation();
            }
        }
    }

    gameArea.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            if (stages[currentStage] && stages[currentStage].validate) {
                if (stages[currentStage].validate()) {
                    currentStage++;
                    loadStage(currentStage);
                }
            }
        }
    });

    loadStage(currentStage);
});

