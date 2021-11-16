const HesGallery = {
  version: '1.4.12',
  options: {
    // Global
    disableScrolling: false,
    hostedStyles: true,
    animations: true,
    keyboardControl: true,
    minResolution: 0,
    autoInit: true,

    // Local
    wrapAround: false,
    showImageCount: true,

    // set to true if images are nested in links
    linkNested: false,
  },

  setOptions(values = {}) {
    for (let key in values) this.options[key] = values[key]
  },

  init(options) {
    this.setOptions(options)

    if (!this.executed) this.createDOM()

    if (this.options.animations) this.elements.pic_cont.classList = 'hg-transition'
    else this.elements.pic_cont.classList = ''

    this.count = document.querySelectorAll('.hes-gallery').length

    this.galleries = []

    for (let i = 0; i < this.count; i++) {
      // Creates a galleries
      this.galleries[i] = new this.HesSingleGallery(i, this)
    }

    // KeyDown event listener
    if (this.options.keyboardControl && !this.keydownEventListener) {
      addEventListener('keydown', ({ keyCode }) => {
        if (keyCode == 39 && this.open && this.options.keyboardControl) this.next()
        if (keyCode == 37 && this.open && this.options.keyboardControl) this.prev()
        if (keyCode == 27 && this.open && this.options.keyboardControl) this.hide()
      })
      this.keydownEventListener = true
    }

    return 'HesGallery initiated!'
  },

  replaceImages(gallery) {
    gallery.querySelectorAll('a.hg-image').forEach((imageLink) => {
      image = imageLink.getElementsByTagName('img')[0]
      image.setAttribute('data-fullsize', imageLink.href.trim())
      imageLink.replaceWith(image)
    })
  },

  createDOM() {
    // Creates DOM Elements for gallery
    this.elements = {}

    if (this.options.hostedStyles)
      document.head.innerHTML +=
        "<link rel='stylesheet' href='https://unpkg.com/hes-gallery/dist/hes-gallery.min.css'>"

    const gallery = document.createElement('div')
    gallery.id = 'hgallery'
    gallery.setAttribute('style', 'visibility:hidden;')

    this.elements.gallery = gallery // Whole gallery

    this.elements.gallery.innerHTML += `
      <div id='hg-bg'></div>
      <div id='hg-pic-cont'>
        <img id='hg-pic' />
        <div id='hg-prev-onpic'></div>
        <div id='hg-next-onpic'></div>
        <div id='hg-subtext'></div>
        <div id='hg-howmany'></div>
      </div>
      <button id='hg-prev' title="Previous" aria-label="Next">
        <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNOC41OSAxNi4zNGw0LjU4LTQuNTktNC41OC00LjU5TDEwIDUuNzVsNiA2LTYgNnoiLz4NCiAgICA8cGF0aCBkPSJNMC0uMjVoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4NCjwvc3ZnPg==" alt="Previous" />
      </button>
      <button id='hg-next' title="Next" aria-label="Previous">
        <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cGF0aCBkPSJNOC41OSAxNi4zNGw0LjU4LTQuNTktNC41OC00LjU5TDEwIDUuNzVsNiA2LTYgNnoiLz4NCiAgICA8cGF0aCBkPSJNMC0uMjVoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4NCjwvc3ZnPg==" alt="Next" />
      </button>
    `

    document.body.appendChild(gallery)

    this.elements.b_prev = document.getElementById('hg-prev')
    this.elements.b_next = document.getElementById('hg-next')

    this.elements.pic_cont = document.getElementById('hg-pic-cont')

    this.elements.b_next_onpic = document.getElementById('hg-next-onpic')
    this.elements.b_prev_onpic = document.getElementById('hg-prev-onpic')

    this.elements.b_prev.onclick = this.elements.b_prev_onpic.onclick = () => {
      this.prev()
    }

    this.elements.b_next.onclick = this.elements.b_next_onpic.onclick = () => {
      this.next()
    }

    document.getElementById('hg-bg').onclick = () => {
      this.hide()
    }

    this.executed = true
  },

  show(g, i) {
    if (innerWidth < this.options.minResolution) return false // If browser width is less than min resolution in settings

    this.currentImg = i
    this.currentGal = g

    this.open = true

    if (this.options.animations || this.elements.pic_cont.classList == 'hg-transition')
      this.elements.pic_cont.classList.remove('hg-transition')

    document.getElementById('hg-pic').setAttribute('src', this.galleries[g].imgPaths[i]) // Sets the path to image

    document.getElementById('hg-pic').alt = this.galleries[g].altTexts[i] // Sets alt attribute

    this.elements.gallery.classList.add('open')

    document.getElementById('hg-subtext').innerHTML = this.galleries[g].subTexts[i]

    if (
      this.galleries[this.currentGal].options.showImageCount &&
      this.galleries[this.currentGal].imgPaths.length != 1
    )
      document.getElementById('hg-howmany').innerHTML = `${this.currentImg + 1}/${
        this.galleries[g].count
      }`
    else document.getElementById('hg-howmany').innerHTML = ''

    // Visibility of next/before buttons in gallery
    if (this.galleries[this.currentGal].imgPaths.length == 1) {
      // One image in gallery
      this.elements.b_prev.classList = 'hg-unvisible'
      this.elements.b_prev_onpic.classList = 'hg-unvisible'
      this.elements.b_next.classList = 'hg-unvisible'
      this.elements.b_next_onpic.classList = 'hg-unvisible'
    } else if (this.currentImg + 1 == 1 && !this.galleries[this.currentGal].options.wrapAround) {
      // First photo
      this.elements.b_prev.classList = 'hg-unvisible'
      this.elements.b_prev_onpic.classList = 'hg-unvisible'

      this.elements.b_next.classList = ''
      this.elements.b_next_onpic.classList = ''
    } else if (
      this.currentImg + 1 == this.galleries[this.currentGal].count &&
      !this.galleries[this.currentGal].options.wrapAround
    ) {
      // Last photo
      this.elements.b_next.classList = 'hg-unvisible'
      this.elements.b_next_onpic.classList = 'hg-unvisible'

      this.elements.b_prev.classList = ''
      this.elements.b_prev_onpic.classList = ''
    } else {
      //Dowolne zdjęcie
      this.elements.b_next.classList = ''
      this.elements.b_next_onpic.classList = ''

      this.elements.b_prev.classList = ''
      this.elements.b_prev_onpic.classList = ''
    }

    if (this.options.disableScrolling) document.body.classList += ' hg-disable-scrolling' // Disable scroll
  },

  hide() {
    if (this.options.animations) this.elements.pic_cont.classList.add('hg-transition')

    this.elements.gallery.classList.remove('open')
    this.open = false
    if (this.options.disableScrolling) document.body.classList.remove('hg-disable-scrolling') // Enable scroll
  },

  next() {
    if (
      this.galleries[this.currentGal].options.wrapAround &&
      this.currentImg == this.galleries[this.currentGal].count - 1
    )
      this.show(this.currentGal, 0)
    else if (this.currentImg + 1 < this.galleries[this.currentGal].count)
      this.show(this.currentGal, this.currentImg + 1)
  },

  prev() {
    if (this.galleries[this.currentGal].options.wrapAround && this.currentImg == 0)
      this.show(this.currentGal, this.galleries[this.currentGal].count - 1)
    else if (this.currentImg + 1 > 1) this.show(this.currentGal, this.currentImg - 1)
  },

  HesSingleGallery: class HesSingleGallery {
    constructor(index, root) {
      this.root = root
      this.index = index
      this.imgPaths = []
      this.subTexts = []
      this.altTexts = []

      this.options = {}

      let gallery = document.getElementsByClassName('hes-gallery')[this.index]

      if (this.root.options.linkNested) this.root.replaceImages(gallery)

      this.options.wrapAround = gallery.hasAttribute('data-wrap')
        ? gallery.dataset.wrap == 'true'
        : this.root.options.wrapAround
      this.options.showImageCount = gallery.hasAttribute('data-img-count')
        ? gallery.dataset.imgCount == 'true'
        : this.root.options.showImageCount

      let disabledCount = 0
      gallery.querySelectorAll('img').forEach((image, i) => {
        if (image.hasAttribute('data-disabled')) disabledCount++
        else {
          if (image.hasAttribute('data-fullsize')) this.imgPaths.push(image.dataset.fullsize || '')
          else this.imgPaths.push(image.src || '')
          this.subTexts.push(image.dataset.subtext || '')
          this.altTexts.push(image.alt || '')

          image.onclick = () => {
            this.root.show(this.index, i - disabledCount)
          }
        }
      })

      this.count = this.imgPaths.length
    }
  },
}

document.addEventListener('DOMContentLoaded', () => {
  if (HesGallery.options.autoInit) HesGallery.init()
})

if ('object' == typeof exports && 'undefined' != typeof module) module.exports = HesGallery

// NodeList polyfill
if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

function submit_comment(){
  var comment = $('.commentar').val();
  el = document.createElement('li');
  el.className = "box_result row";
  el.innerHTML =
		'<div class=\"avatar_comment col-md-1\">'+
		  '<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		'</div>'+
		'<div class=\"result_comment col-md-11\">'+
		'<h4>Anonimous</h4>'+
		'<p>'+ comment +'</p>'+
		'<div class=\"tools_comment\">'+
		'<a class=\"like\" href=\"#\">Like</a><span aria-hidden=\"true\"> · </span>'+
		'<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		'<span aria-hidden=\"true\"> · </span>'+
		'<a class=\"replay\" href=\"#\">Reply</a><span aria-hidden=\"true\"> · </span>'+
			'<span>1m</span>'+
		'</div>'+
		'<ul class="child_replay"></ul>'+
		'</div>';
	document.getElementById('list_comment').prepend(el);
	$('.commentar').val('');
}

$(document).ready(function() {
	$('#list_comment').on('click', '.like', function (e) {
		$current = $(this);
		var x = $current.closest('div').find('.like').text().trim();
		var y = parseInt($current.closest('div').find('.count').text().trim());
		
		if (x === "Like") {
			$current.closest('div').find('.like').text('Unlike');
			$current.closest('div').find('.count').text(y + 1);
		} else if (x === "Unlike"){
			$current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		} else {
			var replay = $current.closest('div').find('.like').text('Like');
			$current.closest('div').find('.count').text(y - 1);
		}
	});
	
	$('#list_comment').on('click', '.replay', function (e) {
		cancel_reply();
		$current = $(this);
		el = document.createElement('li');
		el.className = "box_reply row";
		el.innerHTML =
			'<div class=\"col-md-12 reply_comment\">'+
				'<div class=\"row\">'+
					'<div class=\"avatar_comment col-md-1\">'+
					  '<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
					'</div>'+
					'<div class=\"box_comment col-md-10\">'+
					  '<textarea class=\"comment_replay\" placeholder=\"Add a comment...\"></textarea>'+
					  '<div class=\"box_post\">'+
						'<div class=\"pull-right\">'+
						  '<span>'+
							'<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\" />'+
							'<i class=\"fa fa-caret-down\"></i>'+
						  '</span>'+
						  '<button class=\"cancel\" onclick=\"cancel_reply()\" type=\"button\">Cancel</button>'+
						  '<button onclick=\"submit_reply()\" type=\"button\" value=\"1\">Reply</button>'+
						'</div>'+
					  '</div>'+
					'</div>'+
				'</div>'+
			'</div>';
		$current.closest('li').find('.child_replay').prepend(el);
	});
});

function submit_reply(){
  var comment_replay = $('.comment_replay').val();
  el = document.createElement('li');
  el.className = "box_reply row";
  el.innerHTML =
		'<div class=\"avatar_comment col-md-1\">'+
		  '<img src=\"https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg\" alt=\"avatar\"/>'+
		'</div>'+
		'<div class=\"result_comment col-md-11\">'+
		'<h4>Anonimous</h4>'+
		'<p>'+ comment_replay +'</p>'+
		'<div class=\"tools_comment\">'+
		'<a class=\"like\" href=\"#\">Like</a><span aria-hidden=\"true\"> · </span>'+
		'<i class=\"fa fa-thumbs-o-up\"></i> <span class=\"count\">0</span>'+
		'<span aria-hidden=\"true\"> · </span>'+
		'<a class=\"replay\" href=\"#\">Reply</a><span aria-hidden=\"true\"> · </span>'+
			'<span>1m</span>'+
		'</div>'+
		'<ul class="child_replay"></ul>'+
		'</div>';
	$current.closest('li').find('.child_replay').prepend(el);
	$('.comment_replay').val('');
	cancel_reply();
}

function cancel_reply(){
	$('.reply_comment').remove();
}