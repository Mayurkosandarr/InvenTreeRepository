# from setuptools import setup, find_packages

# setup(
#     name='lead_to_invoice',  # The plugin name
#     version='0.1',
#     description='A plugin for the Lead to Invoice flow in InvenTree',
#     packages=find_packages(),  # Automatically find packages in the folder
#     include_package_data=True,  # Include static files and templates
#     install_requires=[
#         'django>=3.0',  # Dependencies
#     ],
#     classifiers=[
#         'Programming Language :: Python :: 3',
#         'Framework :: Django',
#     ],
# )


from setuptools import setup, find_packages

setup(
    name='lead_to_invoice',  # The plugin name
    version='0.1',
    description='A plugin for the Lead to Invoice flow in InvenTree',
    packages=find_packages(),  # Automatically find packages in the folder
    include_package_data=True,  # Include static files and templates
    install_requires=[
        'django>=3.0',  # Dependencies
    ],
    classifiers=[
        'Programming Language :: Python :: 3',
        'Framework :: Django',
    ],
    entry_points={
        "inventree_plugins": [
            "LeadToInvoicePlugin = lead_to_invoice.plugin:LeadToInvoicePlugin",  # Correct path to the class
        ],
    },
    package_data={
        # Include static files or templates in the package
        'lead_to_invoice': [
            'templates/*',
            'static/*',
        ],
    },
)
