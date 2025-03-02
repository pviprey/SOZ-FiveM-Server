RegisterServerEvent("inventory:server:openInventory", function(storageType, invID, ctx)
    local Player = QBCore.Functions.GetPlayer(source)

    local targetMoney = nil
    if storageType == "player" then
        local Target = QBCore.Functions.GetPlayer(invID)
        targetMoney = Target.PlayerData.money
    end

    local sourceInv = Inventory(source)
    local targetInv = GetOrCreateInventory(storageType, invID, ctx)

    if Inventory.AccessGranted(targetInv, Player.PlayerData.source) then
        targetInv.users[Player.PlayerData.source] = true

        TriggerClientEvent("inventory:client:openInventory", Player.PlayerData.source, Inventory.FilterItems(sourceInv, targetInv.type),
                           Inventory.FilterItems(targetInv, sourceInv.type), targetMoney)
    else
        TriggerClientEvent("soz-core:client:notification:draw", Player.PlayerData.source, "Vous n'avez pas accès à ce stockage", "error")
    end
end)

RegisterServerEvent("inventory:server:bin-vandalism", function(invID, ctx)
    local storageType = "bin"
    local binInv = GetOrCreateInventory(storageType, invID, ctx)
    local count = Inventory.Search(binInv, "amount", "garbagebag")
    Inventory.RemoveItem(binInv, "garbagebag", count)
    Inventory.AddItem(source, binInv, "torn_garbagebag", math.floor(count / 2))
end)

QBCore.Functions.CreateCallback("inventory:server:TransfertItem",
                                function(source, cb, inventorySource, inventoryTarget, item, amount, metadata, slot, targetSlot, manualFilter)
    Inventory.TransfertItem(source, inventorySource, inventoryTarget, item, amount, metadata, slot, function(success, reason)
        local sourceInv = Inventory(inventorySource)
        local targetInv = Inventory(inventoryTarget)

        local sourceInventory = Inventory.FilterItems(sourceInv, targetInv.type)
        if sourceInv.id == targetInv.id and manualFilter then
            sourceInventory = Inventory.FilterItems(sourceInv, manualFilter)
        end

        if sourceInv.type == "trunk" or targetInv.type == "trunk" then
            TriggerClientEvent("animation:client:give", source)
        end

        cb(success, reason, sourceInventory, Inventory.FilterItems(targetInv, sourceInv.type))
    end, targetSlot, manualFilter)
end)

QBCore.Functions.CreateCallback("inventory:server:TransfertMoney", function(source, cb, target, amount, inverse)
    local SourcePlayer = QBCore.Functions.GetPlayer(source)
    local TargetPlayer = QBCore.Functions.GetPlayer(tonumber(target))

    if inverse then
        local temp = TargetPlayer
        TargetPlayer = SourcePlayer
        SourcePlayer = temp
    end

    if SourcePlayer.PlayerData.source == TargetPlayer.PlayerData.source then
        cb(SourcePlayer.PlayerData.money, TargetPlayer.PlayerData.money)
        return
    end

    local moneyAmount = SourcePlayer.Functions.GetMoney("money")
    local moneyMarkedAmount = SourcePlayer.Functions.GetMoney("marked_money")

    if (moneyAmount + moneyMarkedAmount) >= amount then
        local moneyTake = 0
        local markedMoneyTake = 0

        if moneyAmount < amount then
            moneyTake = moneyAmount
            markedMoneyTake = amount - moneyAmount
        else
            moneyTake = amount
        end

        SourcePlayer.Functions.RemoveMoney("money", moneyTake)
        SourcePlayer.Functions.RemoveMoney("marked_money", markedMoneyTake)
        TargetPlayer.Functions.AddMoney("money", moneyTake)
        TargetPlayer.Functions.AddMoney("marked_money", markedMoneyTake)

        if inverse then
            TriggerClientEvent("soz-core:client:notification:draw", SourcePlayer.PlayerData.source, string.format("On vous a pris ~r~%s$", amount))
            TriggerClientEvent("soz-core:client:notification:draw", TargetPlayer.PlayerData.source, string.format("Vous avez pris ~g~%s$", amount))
        else
            TriggerClientEvent("soz-core:client:notification:draw", SourcePlayer.PlayerData.source, string.format("Vous avez donné ~r~%s$", amount))
            TriggerClientEvent("soz-core:client:notification:draw", TargetPlayer.PlayerData.source, string.format("Vous avez reçu ~g~%s$", amount))
        end

        exports["soz-core"]:Event("give_money", {
            src = SourcePlayer.PlayerData.citizenid,
            target = TargetPlayer.PlayerData.citizenid,
        }, {money = moneyTake, marked_money = markedMoneyTake})
    else
        TriggerClientEvent("soz-core:client:notification:draw", source, "Pas assez d'argent", "error")
    end

    cb(SourcePlayer.Functions.GetMoney("money") + SourcePlayer.Functions.GetMoney("marked_money"),
       TargetPlayer.Functions.GetMoney("money") + TargetPlayer.Functions.GetMoney("marked_money"))
end)

QBCore.Functions.CreateCallback("inventory:server:SortInventoryAZ", function(source, cb, inventorySource)
    Inventory.SortInventoryAZ(inventorySource, function(success, reason)
        local sourceInv = Inventory(inventorySource)

        cb(success, reason, sourceInv)
    end)
end)

RegisterServerEvent("inventory:server:closeInventory", function(invID)
    local targetInv = Inventory(invID)

    if targetInv and targetInv.users[source] then
        targetInv.users[source] = nil
    end
end)

RegisterServerEvent("inventory:server:renameItem", function(label, item)
    local inventorySource = Inventory(source)
    local metadata = item.metadata
    metadata.label = label

    Inventory.SetMetadata(inventorySource, item.slot, metadata)
    local message = string.format("Vous avez ajouté l'étiquette ~g~%s", label)
    TriggerClientEvent("soz-core:client:notification:draw", source, message)
end)
