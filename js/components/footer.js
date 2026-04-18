const footerContent = `
    <nav class="navFooter">
            <div class="footerLinks">
                <a class="gitLink" href="https://github.com/SergeyGro/life-organizer" target="_blank"><i class="fab fa-github"></i></a>
                <a class="tgLink" href="https://t.me/Crassys" target="_blank"><i class="fab fa-telegram"></i></a>
            </div>
            <p><small><i class="far fa-copyright"></i> Проект создан в учебных целях, 2026</small></p>
    </nav>
`;

export default function getFooter(){
    const footer = document.getElementById('footer');
    footer.innerHTML = footerContent;
}