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
        _formatMessage("Sucesso: ", msg)

        $('#from-message').find('#icon').addClass('fa-check')
        $('#from-message').addClass('alert-primary')
        $('#from-message').toast('show')
    }

    const _msgError = (msg) => {
        _formatMessage("Erro: ", msg)

        $('#from-message').find('#icon').addClass('fa-exclamation')
        $('#from-message').addClass('alert-danger')
        $('#from-message').toast('show')
    }

    const _msgWarning = (msg) => {
        _formatMessage("Atenção: ", msg)

        $('#from-message').find('#icon').addClass('fa-exclamation-triangle')
        $('#from-message').addClass('alert-warning')
        $('#from-message').toast('show')
    }

    const _formatMessage = (title, body) => {
        $('#from-message').removeClass('alert-danger')
        $('#from-message').removeClass('alert-warning')
        $('#from-message').removeClass('alert-primary')

        $('#from-message').find('#icon').removeClass('fa-check')
        $('#from-message').find('#icon').removeClass('fa-exclamation-triangle')
        $('#from-message').find('#icon').removeClass('fa-exclamation')

        $('#from-message').find('#titulo').html(title)
        $('#from-message').find('#time').html(_formatDateTime(Date.now()))
        $('#from-message').find('#body').html(body)

    }

    const _formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
   
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
   
        return [year, month, day].join('-');
    }

    const _formatDateTime = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hours = '' + d.getHours(),
            minutes = '' + d.getMinutes();
   
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        
        let data = [day, month, year].join('/');
        let horario = [hours, minutes].join(':');
        let datatime = data + " " + horario;

        return datatime;
    }

    return {
        loadFragment: _loadFragment,
        msgSucessfull: _msgSucessfull,
        msgError: _msgError,
        msgWarning: _msgWarning,
        formatDate: _formatDate,
        formatDateTime: _formatDateTime
    }
})()