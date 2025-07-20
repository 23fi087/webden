document.addEventListener('DOMContentLoaded', function() {
    // --- WebサイトのUIスクリプト ---
    const navbar = document.querySelector('.navbar'); // ナビゲーションバー要素を取得
    const sections = Array.from(document.querySelectorAll('.hero, .section, .footer')); // ヒーロー、セクション、フッター要素を配列として取得
    const mainContent = document.querySelector('.main-content'); // メインコンテンツ要素を取得

    // --- ページ送り、ナビゲーション、アニメーションのロジックはここに統合 ---
    let currentSection = 0; // 現在のセクションのインデックス
    let isScrolling = false; // スクロール中かどうかのフラグ

    // 指定されたセクションへスクロールする関数
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return; // 無効なインデックスの場合は処理を中断
        isScrolling = true; // スクロール中フラグを立てる
        const targetSection = sections[index]; // ターゲットとなるセクション要素を取得
        mainContent.scrollTo({
            top: targetSection.offsetTop, // ターゲットセクションのY座標までスクロール
            behavior: 'smooth' // スムーズスクロール
        });
        currentSection = index; // 現在のセクションを更新
        setTimeout(() => {
            isScrolling = false; // スクロール完了後にフラグをリセット
        }, 1000); // スムーズスクロールの時間に合わせて調整
    }

  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id; // 交差している要素のIDを取得
            const navLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`); // 対応するナビゲーションリンクを取得

            if (entry.isIntersecting) { // 要素がビューポートに入った場合
                // フェードインアニメーションを適用
                entry.target.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
                
                // タイトルアニメーションを適用
                const animatedTitle = entry.target.querySelector('.animated-title .text');
                if (animatedTitle) {
                    animatedTitle.classList.add('is-active');
                }

                // Update nav link: ナビゲーションリンクのアクティブ状態を更新
                // if (navLink) {
                //     document.querySelectorAll('.navbar-nav .nav-link').forEach(link => link.classList.remove('active'));
                //     navLink.classList.add('active');
                // }

                //  ナビゲーションバーの背景を変更
                if (sectionId === 'home') {
                    navbar.classList.remove('scrolled'); // ホームセクションの場合はスクロール状態を解除
                } else {
                    navbar.classList.add('scrolled'); // それ以外のセクションの場合はスクロール状態にする
                }

            } else { // 要素がビューポートから外れた場合
                // Reset animations when out of view: アニメーションをリセット
                entry.target.querySelectorAll('.fade-in').forEach(el => el.classList.remove('visible'));
                const animatedTitle = entry.target.querySelector('.animated-title .text');
                if (animatedTitle) {
                    animatedTitle.classList.remove('is-active');
                }
            }
        });
    }, { 
        root: mainContent, // 監視対象のルート要素
        threshold: 0.4 // ターゲットの40%が見えたら交差と判断
    });

    // 各セクションを監視対象に追加
    sections.forEach(section => {
        observer.observe(section);
    });

    // ナビゲーションリンクのクリックイベント処理
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // デフォルトのアンカーリンク動作をキャンセル
            const targetId = this.getAttribute('href'); // リンクのhref属性を取得
            const targetElement = document.querySelector(targetId); // ターゲット要素を取得
            if (targetElement) {
                mainContent.scrollTo({
                    top: targetElement.offsetTop, // ターゲット要素のY座標までスクロール
                    behavior: 'smooth' // スムーズスクロール
                });
            }
        });
    });

    // 現在のURLに基づいてナビゲーションリンクのアクティブ状態を設定
    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop(); // 現在のパス名を取得
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active'); // 全てのリンクからactiveクラスを削除
            const linkPath = link.getAttribute('href').split('/').pop(); // リンクのhref属性からパス名を取得
            if (currentPath === linkPath) {
                link.classList.add('active'); // 現在のパスと一致すればactiveクラスを追加
            } else if (currentPath === '' && linkPath === 'index.html') { // index.htmlがルートの場合
                link.classList.add('active');
            }
        });
    }
    setActiveNavLink(); // ページ読み込み時に実行

    // テキストを文字ごとに分割してアニメーションを適用するための関数
    function splitTextIntoChars(element) {
        const textContent = element.getAttribute('aria-label'); // aria-label属性からテキストコンテンツを取得
        if (!textContent) return; // テキストコンテンツがなければ処理を中断
        element.innerHTML = ''; // 要素のHTMLをクリア
        textContent.split('').forEach((char, index) => { // 各文字を分割してループ
            const span = document.createElement('span'); // span要素を作成
            span.classList.add('char'); // charクラスを追加
            span.textContent = char; // 文字をspan要素のテキストに設定
            span.style.setProperty('--char-index', index); // CSS変数--char-indexを設定
            element.appendChild(span); // span要素を親要素に追加
        });
    }

    // 全てのanimated-titleクラスを持つ要素に対してテキスト分割関数を適用
    document.querySelectorAll('.animated-title .text').forEach(titleElement => {
        splitTextIntoChars(titleElement);
    });

    // --- ページ遷移処理 ---
    const pageTransitionButtons = document.querySelectorAll('a.btn'); // ページ遷移ボタンを取得
    pageTransitionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href'); // リンクのhref属性を取得
            if (!href || href.startsWith('#') || href.startsWith('http')) { // 内部リンクでない場合は処理を中断
                return;
            }
          
        });
    });

    console.log('Nova Architectural University Webサイトが正常に読み込まれました！'); // コンソールにメッセージを出力
});
