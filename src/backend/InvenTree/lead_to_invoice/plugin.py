# from InvenTree.lead_to_invoice.plugin import InvenTreePlugin

class LeadToInvoicePlugin:
    """
    Lead to Invoice plugin for InvenTree.
    This plugin handles the flow from lead creation to invoice generation.
    """

    def __init__(self):
        self.name = "Lead to Invoice Plugin"
        self.version = "0.1"
        self.description = "A plugin for managing the Lead to Invoice flow in InvenTree."

    def load(self):
        """
        This method is called when InvenTree loads the plugin.
        You can register models, views, API endpoints, etc.
        """
        print("Lead to Invoice Plugin loaded")

        # You can add custom URL routes, views, or other functionality here.
        # For example, registering custom views:
        # from .views import register_lead_to_invoice_view
        # register_lead_to_invoice_view()

    def unload(self):
        """
        This method is called when InvenTree unloads the plugin.
        You can clean up resources here if needed.
        """
        print("Lead to Invoice Plugin unloaded")
