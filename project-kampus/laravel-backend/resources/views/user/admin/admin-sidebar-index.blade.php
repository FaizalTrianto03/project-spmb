        {{-- MENU KHUSUS UNTUK FINANCE DEPARTEMENT --}}
        <li class="sidebar-title">Menu Finansial</li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.finance.*', request()->path()) ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-vault"></i>
                <span>Data Keuangan</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.finance.tagihan-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.finance.tagihan-index') }}" class="submenu-link">Data Tagihan</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.finance.pembayaran-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.finance.pembayaran-index') }}" class="submenu-link">Data Pembayaran</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.finance.keuangan-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.finance.keuangan-index') }}" class="submenu-link">Data Keuangan</a>
                </li>
            </ul>
        </li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.approval.*', request()->path()) ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-file-signature"></i>
                <span>Data Approval</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is($prefix . 'approval.absen-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route($prefix . 'approval.absen-index') }}" class="submenu-link">Approval Absensi</a>
                </li>
            </ul>
        </li>


        {{-- MENU KHUSUS UNTUK WEB ADMINISTRATOR --}}
        <li class="sidebar-title">Menu Pusat Informasi</li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.workers.*', request()->path()) ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-users"></i>
                <span>Data Pengguna</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.workers.admin-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.workers.admin-index') }}" class="submenu-link">Data Admin</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.workers.staff-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.workers.staff-index') }}" class="submenu-link">Data Pegawai</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.workers.lecture-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.workers.lecture-index') }}" class="submenu-link">Data Dosen</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.workers.student-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.workers.student-index') }}" class="submenu-link">Data Mahasiswa</a>
                </li>
            </ul>
        </li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.master.taka-*', 'web-admin.master.fakultas-*', 'web-admin.master.pstudi-*') ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-school"></i>
                <span>Data Akademik</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.master.taka-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.taka-index') }}" class="submenu-link">Data Tahun Akademik</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.master.fakultas-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.fakultas-index') }}" class="submenu-link">Data Fakultas</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.master.pstudi-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.pstudi-index') }}" class="submenu-link">Data Program Studi</a>
                </li>
            </ul>
        </li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.master.proku-*') ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-school"></i>
                <span>Data PMB</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.master.proku-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.proku-index') }}" class="submenu-link">Data Program Kuliah</a>
                </li>
            </ul>
        </li>
        <li class="sidebar-item has-sub {{ Route::is('web-admin.master.kurikulum-*', 'web-admin.master.kelas-*', 'web-admin.master.matkul-*', 'web-admin.master.jadkul-*') ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-school"></i>
                <span>Data KBM</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.master.kurikulum-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.kurikulum-index') }}" class="submenu-link">Data Kurikulum</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.master.kelas-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.kelas-index') }}" class="submenu-link">Data Kelas</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.master.matkul-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.matkul-index') }}" class="submenu-link">Data Mata Kuliah</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.master.jadkul-*') ? 'active' : '' }}">
                    <a href="{{ route('web-admin.master.jadkul-index') }}" class="submenu-link">Data Jadwal Kuliah</a>
                </li>
            </ul>
        </li>

        <li class="sidebar-item has-sub {{ Route::is('web-admin.inventory.*', request()->path()) ? 'active' : '' }}">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-school"></i>
                <span>Data Inventaris</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item {{ Route::is('web-admin.inventory.gedung-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.inventory.gedung-index') }}" class="submenu-link">Data Gedung</a>
                </li>
                <li class="submenu-item {{ Route::is('web-admin.inventory.ruang-*', request()->path()) ? 'active' : '' }}">
                    <a href="{{ route('web-admin.inventory.ruang-index') }}" class="submenu-link">Data Ruangan</a>
                </li>
            </ul>
        </li>

        {{-- <li class="sidebar-title">Talent Management</li>
        <li class="sidebar-item has-sub">
            <a href="#" class='sidebar-link'>
                <i class="fa-solid fa-list-check"></i>
                <span>Report Manager</span>
            </a>
            <ul class="submenu">
                <li class="submenu-item">
                    <a href="#" class="submenu-link">Daily Report</a>
                </li>
                <li class="submenu-item">
                    <a href="#" class="submenu-link">Monthly Report</a>
                </li>
                <li class="submenu-item">
                    <a href="#" class="submenu-link">Presence Report</a>
                </li>
            </ul>
        </li> --}}
        {{-- END -- MENU KHUSUS UNTUK WEB ADMINISTRATOR --}}
