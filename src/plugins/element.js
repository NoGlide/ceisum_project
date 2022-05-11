import Vue from 'vue';
import {
    Button,
    Form,
    FormItem,
    Message,
    Container,
    Header,
    Main,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
} from 'element-ui';
import { menuItemEmits } from 'element-plus';
import Row from 'element-plus/lib/components/row/src/row';

Vue.use(
    Button,
    Form,
    FormItem,
    Container,
    Header,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Pagination,
    Dialog
);
Vue.prototype.$Message = Message;