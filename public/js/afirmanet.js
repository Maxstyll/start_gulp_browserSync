$(document).ready(function () {
    var linkAll = document.querySelectorAll('link[rel="import"]')
    linkAll.forEach(item => {
        Utils.loadFragment(item)
    })

    $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        let nameTableDestino = e.target.hash // newly activated tab
        let nameTableOrigem = e.relatedTarget.hash // previous active tab
    })
})

const Utils = (() => {
    const prefix_tmpl = "#tmpl-"

    const _loadFragment = (link) => {
        let lstTarget = link.target.split(',')

        lstTarget.forEach(target => {
            let template = link.import.querySelector(prefix_tmpl + link.slot)
            let clone = document.importNode(template.content, true)
            let nav = document.querySelector('#' + target.trim())
            nav.appendChild(clone)
        })
    }

    const _msgSucessfull = (msg) => {
        $('#from-message').removeClass('alert-danger')
        $('#from-message').removeClass('alert-warning')
        $('#from-message').removeClass('alert-primary')

        $('#from-message').addClass('alert-primary')
        $('#from-message').toast('show')
    }

    const _msgError = (msg) => {
        $('#from-message').removeClass('alert-danger')
        $('#from-message').removeClass('alert-warning')
        $('#from-message').removeClass('alert-primary')

        $('#from-message').addClass('alert-danger')
        $('#from-message').toast('show')
    }

    const _msgWarning = (msg) => {
        $('#from-message').removeClass('alert-danger')
        $('#from-message').removeClass('alert-warning')
        $('#from-message').removeClass('alert-primary')

        $('#from-message').addClass('alert-warning')
        $('#from-message').toast('show')
    }

    return {
        loadFragment: _loadFragment,
        msgSucessfull: _msgSucessfull,
        msgError: _msgError,
        msgWarning: _msgWarning
    }
})()