$(document).ready(function () {
    var linkAll = document.querySelectorAll('link[rel="import"]');
    linkAll.forEach(item => {
        Utils.loadFragment(item);
    });

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        let nameTableDestino = e.target.hash // newly activated tab
        let nameTableOrigem = e.relatedTarget.hash // previous active tab
    })
});

const Utils = (() => {
    let lst_menu = ["agendas", "messages", "dashboard", "apps", "profiles", "users", "logs"]
    const prefix_msd = "#item-mls-";
    const prefix_mls = "#item-msd-";
    const prefix_tab = "#tab-";
    const prefix_tmpl = "#tmpl-";

    const _removeActiveMenu = () => {
        lst_menu.forEach(item => {
            let item_msd = prefix_msd + item;
            let item_mls = prefix_mls + item;
            let tab = prefix_tab + item;

            $(item_msd).removeClass('active');
            $(item_mls).removeClass('active');
            $(tab).removeClass('active');
            $(tab).removeClass('show');
        })
    };

    const _getForm = (menu) => {
        _removeActiveMenu();
        let base_id = menu.id.split('-');
        base_id = base_id[base_id.length - 1];

        let item_msd = prefix_msd + base_id;
        let item_mls = prefix_mls + base_id;
        let tab = prefix_tab + base_id;

        $(item_msd).addClass('active');
        $(item_mls).addClass('active');
        $(tab).addClass('active');
        $(tab).addClass('show');
    }

    const _loadFragment = (link) => {
        let lstTarget = link.target.split(',');

        lstTarget.forEach(target => {
            let template = link.import.querySelector(prefix_tmpl + link.slot);
            let clone = document.importNode(template.content, true);
            let nav = document.querySelector('#' + target.trim());
            nav.appendChild(clone);
        })

    };

    return {
        removeActiveMenu: _removeActiveMenu,
        getForm: _getForm,
        loadFragment: _loadFragment
    }
})();