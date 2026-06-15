// 履歴画面専用の処理（データの読み込みと表示、削除）
document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('log-list');
    const clearBtn = document.getElementById('clear-btn');

    // 履歴データをローカルストレージから読み込んで画面に表示する関数
    const renderLogs = () => {
        // ペア1が保存したデータを読み込む
        const logs = JSON.parse(localStorage.getItem('omikuji_logs')) || [];
        
        if (logs.length === 0) {
            list.innerHTML = `
                <li style = "justify-content: center; color:#95a5a6;">
                    まだおみくじを引いていません。
                </li>
            `.trim();
            return;
        }

        // データをHTMLのリスト形式に整形して流し込む
        list.innerHTML = logs.map(log => `
            <li>
                <span>${log.date}</span>
                <strong>${log.rank}</strong>
            </li>
        `).join('');
    };

    // 履歴クリアボタンを押したときの処理
    clearBtn.onclick = () => {
        if (confirm('これまでの履歴をすべて削除しますか？')) {
            localStorage.removeItem('omikuji_logs');
            renderLogs(); // 画面を空にして再描画
        }
    };

    // 画面が表示されたときに履歴を自動読み込み
    renderLogs();
});