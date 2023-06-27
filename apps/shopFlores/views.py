from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings
# Create your views here.


def cargarInicio(request):
    return render(request,"inicio")

def cargarTienda(request):
    productos = Producto.objects.filter(stock__gt=0)
    categoria_flores = Producto.objects.filter(id_categoria = 1)
    categoria_ramos = Producto.objects.filter(id_categoria = 2)
    return render(request,"tienda.html",{"cat_flores":categoria_flores,"cat_ramos":categoria_ramos})

def cargarAgregarProducto(request):
    categoria = Categoria.objects.all()
    productos = Producto.objects.all()
    return render(request,"agregarProductos.html",{"cat":categoria,"prod":productos})

def agregarProducto(request):
    #print ("AGREGAR PRODUCTOS", request.POST)

    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    v_sku = request.POST['txtSku']
    v_nombre = request.POST['txtnombre']
    v_precio = request.POST['txtprecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']
    v_imagen = request.FILES['txtImagen']   

    Producto.objects.create(sku = v_sku, nombre = v_nombre, precio = v_precio, stock = v_stock, descripcion = v_descripcion, imagen = v_imagen, id_categoria = v_categoria)
    
    return redirect('/agregarProducto')



def cargarEditarProducto(request,sku):
    productos = Producto.objects.get(sku = sku)
    categorias = Categoria.objects.all()
    return render(request,"editarProductos.html",{"prod":productos, "cat":categorias})

def editarProducto(request):

    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    v_sku = request.POST['txtSku']
    productoBD = Producto.objects.get(sku = v_sku)
    v_nombre = request.POST['txtnombre']
    v_precio = request.POST['txtprecio']
    v_stock = request.POST['txtStock']
    v_descripcion = request.POST['txtDescripcion']

    try:
        v_imagen = request.FILES['txtImagen']
        ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.imagen))
    except:
        v_imagen = productoBD.imagen

    productoBD.nombre = v_nombre
    productoBD.precio = v_precio
    productoBD.stock = v_stock
    productoBD.descripcion = v_descripcion
    productoBD.id_categoria = v_categoria
    productoBD.imagen = v_imagen
    
    productoBD.save()

    return redirect('/agregarProducto')

def eliminarProducto(request,codigo_producto):
    producto = Producto.objects.get(sku = codigo_producto)
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(producto.imagen))
    os.remove(ruta_imagen)
    producto.delete()
    return('/agregarProducto')




def cargarRegistrar(request):

    return render(request,"registrar.html")

def cargarLogin(request):
    return render(request,"login.html")
