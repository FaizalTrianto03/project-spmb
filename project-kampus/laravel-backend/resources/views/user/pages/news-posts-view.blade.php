@extends('base.base-dash-index')
@section('title')
    Data Postingan - Siakad By Internal Developer
@endsection
@section('menu')
    Data Postingan
@endsection
@section('submenu')
    Edit Postingan
@endsection
@section('submenu0')
    Edit Postingan - {{ $post->name }}
@endsection
@section('urlmenu')
    #
@endsection
@section('subdesc')
    Halaman untuk mengelola Postingan
@endsection
@section('custom-css')
    <link rel="stylesheet" href="{{ asset('dist') }}/assets/extensions/summernote/summernote-lite.css">
    <link rel="stylesheet" href="{{ asset('dist') }}/assets/compiled/css/form-editor-summernote.css">
    <link href="https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet">
    <link href="https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css" rel="stylesheet">

<style>
html.dark {
    --w-e-textarea-bg-color: #333;
    --w-e-textarea-color: #fff;
}
  #editor—wrapper {
    border: 1px solid #ccc;
    z-index: 100; /* If you need */
  }
  #toolbar-container { border-bottom: 1px solid #ccc; }
  #editor-container { height: 500px; }
</style>
@endsection
@section('content')
<section class="section row">

    <div class="col-lg-12 col-12">
        <form action="{{ route('web-admin.news.post-update', $post->code) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PATCH')

            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title">@yield('submenu')</h5>
                    <div class="">
                        <a href="{{ route('web-admin.news.post-index') }}" class="btn btn-warning"><i class="fa-solid fa-backward"></i></a>
                    </div>

                </div>
                <div class="card-body row">

                    <div class="col-lg-4 col-12">
                        <div class="form-group">
                            <img src="{{ asset('storage/images/' . $post->image) }}" class="card-img-top" alt="">

                            <label for="image">Post Cover</label>
                            <input type="file" class="form-control" name="image" id="image" accept="image/*">
                            @error('image')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                    </div>
                    <div class="col-lg-8 col-12">
                        <div class="form-group">
                            <label for="category_id">Kategori Postingan</label>
                            <select name="category_id" id="category_id" class="form-select">
                                <option value="" selected>Pilih Kategori</option>
                                @foreach ($category as $item)
                                    <option value="{{ $item->id }}" {{ $post->category_id === $item->id ? 'selected' : '' }}>{{ $item->name }}</option>
                                @endforeach
                            </select>
                            @error('category_id')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="name">Judul Postingan</label>
                            <input type="text" class="form-control" name="name" id="name" value="{{ $post->name }}" placeholder="Inputkan judul postingan...">
                            @error('name')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="keywords">Kata Kunci Postingan</label>
                            <input type="text" class="form-control" name="keywords" id="keywords" value="{{ $post->keywords }}" placeholder="Inputkan kata kunci postingan...">
                            @error('keywords')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                        <div class="form-group">
                            <label for="metadesc">Meta Desc Postingan</label>
                            <input type="text" class="form-control" name="metadesc" id="metadesc" value="{{ $post->metadesc }}" placeholder="Inputkan meta deskripsi postingan...">
                            @error('metadesc')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>

                    </div>
                    <div class="col-lg-12 col-12">
                        <div class="form-group col-lg-12 col-12">
                            <label for="content">Isi Konten Postingan</label>
                            {{-- <textarea name="content" id="summernote" cols="30" rows="10">{!! $post->content !!}</textarea> --}}
                            <div id="editor—wrapper">
                                <div id="toolbar-container"><!-- toolbar --></div>
                                <div id="editor-container"><!-- editor --></div>
                            </div>
                            <textarea id="editor-content" name="content" style="display: none;">{!! $post->content !!}</textarea>
                            @error('content')
                                <small class="text-danger">{{ $message }}</small>
                            @enderror
                        </div>
                        <div class="d-flex justify-content-end align-items-center">
                            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

</section>
@endsection
@section('custom-js')
    <script>
        document.getElementById("image").onchange = function(event) {
            var reader = new FileReader();
            reader.onload = function() {
                var output = document.querySelector('.card-img-top');
                output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        };
    </script>
    <script src="{{ asset('dist') }}/assets/extensions/summernote/summernote-lite.min.js"></script>
    <script src="{{ asset('dist') }}/assets/static/js/pages/summernote.js"></script>
    <script src="https://unpkg.com/@wangeditor/editor@latest/dist/index.js"></script>
    <script src="https://unpkg.com/@wangeditor/editor@latest/dist/i18n/en.js"></script> <!-- Tambahkan ini -->
    {{-- <script>
    const { createEditor, createToolbar, i18nChangeLanguage } = window.wangEditor

    // Ganti bahasa ke Inggris
    i18nChangeLanguage('en')

    const editorConfig = {
        placeholder: 'Type here...',
        MENU_CONF: {
          uploadImage: {
            fieldName: 'filed',
            base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
          }
        },
        onChange(editor) {
          const html = editor.getHtml()
          document.getElementById('editor-content').value = html
        }
    }



    // Mengambil nilai konten awal dari textarea yang tersembunyi
    const initialContent = document.getElementById('editor-content').value;

    const editor = createEditor({
        selector: '#editor-container',
        html: initialContent,
        // html: '<p><br></p>',
        config: editorConfig,
        mode: 'default', // or 'simple'
    })

    const toolbarConfig = {}

    const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'default', // or 'simple'
    })
    </script> --}}
    <script>
        const E = window.wangEditor

        // Ganti bahasa editor
        // const LANG = location.href.indexOf('lang=en') > 0 ? 'en' : 'zh-CN'
        E.i18nChangeLanguage('en')
        // Mengambil nilai konten awal dari textarea yang tersembunyi
        const initialContent = document.getElementById('editor-content').value;

        window.editor = E.createEditor({
          selector: '#editor-container',
          html: initialContent,
          config: {
            placeholder: 'Type here...',
            MENU_CONF: {
              uploadImage: {
                fieldName: 'your-fileName',
                base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
              }
            },
            onChange(editor) {
              const html = editor.getHtml()
              document.getElementById('editor-content').value = html
            }
          }
        })



        window.toolbar = E.createToolbar({
          editor,
          selector: '#toolbar-container',
          config: {}
        })
    </script>
@endsection
