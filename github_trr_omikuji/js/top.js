// トップ画面専用の処理（おみくじ抽選とデータ書き込み）
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    const resultArea = document.getElementById('result');
    const rankText = document.getElementById('rank');
    const msgText = document.getElementById('msg');

    // おみくじのデータ
    const fortunes = [
        // 修正（ここに1行追加）
        { rank: '✨ 吉', msg: '良い運気です。普段通りの努力が実を結びます。' },
        { rank: '🙂 中吉', msg: '穏やかな幸運日。身近な人に感謝すると吉。' },
        { rank: '末吉', msg: '伸びしろがある運勢。焦らず一歩ずつ進みましょう。' }
    ];

    // ボタンをクリックしたときの処理
    btn.onclick = () => {
        // 1. ランダムに運勢を決定
        const f = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        // 2. 画面に結果を表示
        rankText.innerText = f.rank;
        msgText.innerText = f.msg;
        resultArea.classList.remove('hide');
        
        // 3. 履歴の保存（ペア2へのデータ引き渡し）
        // ローカルストレージから既存の履歴を読み込む（なければ空の配列）
        const logs = JSON.parse(localStorage.getItem('omikuji_logs')) || [];
        
        // 新しい履歴データを先頭に追加（日時と運勢結果）
        const now = new Date();
        const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        logs.unshift({ date: timeStr, rank: f.rank });
        
        // 最新の10件だけを残してローカルストレージに再保存
        localStorage.setItem('omikuji_logs', JSON.stringify(logs.slice(0, 10)));
    };
});