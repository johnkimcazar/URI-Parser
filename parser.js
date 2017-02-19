var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    var uriParts = {
        scheme: '',
        authority: '',
        path: '',
        query: '',
        fragment: ''
    };
    var start,end;
    end = uri.length;

    // scheme
    uriParts['scheme'] = uri.substring(0,uri.indexOf(':'));
    if(uriParts['scheme'] != 'mailto'){
        uri = uri.substring(uri.indexOf(':')+1);

        //authority
        if(uri.charAt(0) == '/' && uri.charAt(1) == '/'){
            if(uri.indexOf('/',2) > 0)
                end = uri.indexOf('/',2);
            else if(uri.indexOf('?',2) > 0)
                end = uri.indexOf('/',2);
            else if(uri.indexOf('#',2) > 0)
                end = uri.indexOf('#',2);

            uriParts['authority'] = uri.substring(2,end);
            if(end == uri.length)
                return uriParts;
            uri = uri.substring(end);
            end = uri.length;
        }
    }
    else{
        uriParts['authority'] = uri.substring(uri.indexOf(':')+1);
        return uriParts;
    }

    //path
    if(uri.charAt(0) == '/'){
        if(uri.indexOf('?') > 0)
            end = uri.indexOf('?');
        else if(uri.indexOf('#') > 0)
            end = uri.indexOf('#');
        uriParts['path'] = uri.substring(0,end);
        uri = uri.substring(end);
        end = uri.length;
    }
    //query
    if(uri.charAt(0) == '?'){
        if(uri.indexOf('#') > 0)
            end = uri.indexOf('#');
        uriParts['query'] = uri.substring(1,end);
        uri = uri.substring(end);
        end = uri.length;
    }
    //fragment
    if(uri.charAt(0) == '#'){
        uriParts['fragment'] = uri.substring(0);
    }
    return uriParts;
}