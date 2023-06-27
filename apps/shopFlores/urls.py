from django.urls import path
from . import views
from django.conf import Settings

urlpatterns = [
    path('',views.cargarInicio),
    path('tienda',views.cargarTienda),
    path('registrarse',views.cargarRegistrar),
    path('login',views.cargarLogin),
    path('agregarProducto',views.cargarAgregarProducto),
    path('agregarProductoForm',views.agregarProducto),
    path('editarProducto/<sku>',views.cargarEditarProducto),
    path('editarProducto',views.editarProducto),
    path('eliminarProducto/<codigo_producto>',views.eliminarProducto)

]